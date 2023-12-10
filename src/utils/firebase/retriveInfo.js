import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState , progettiState, blockHeightState, providerState, favouritesState } from '../../recoilState';
import { db, getIdentity, init } from './firebaseInit';
import addressProjectFactory from '../../abi/projectFactory/address.js';
import addressFundingToken from '../../abi/fundingToken/address.js';
import addressDopotReward from '../../abi/dopotReward/address.js';
import { useTranslation } from "react-i18next";
const { ethers, Contract } = require("ethers");
const abiProject = require('../../abi/project/1.json');
const abiProjectFactory = require('../../abi/projectFactory/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const abiDopotReward = require('../../abi/dopotReward/1.json');
const ascii85 = require('ascii85');
export let provider;

export async function getProvider(){ let signer;
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                chainId: "0x13881",
                rpcUrls: ["https://polygon-mumbai.gateway.tenderly.co"],
                 chainName: "Mumbai Testnet",
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://mumbai.polygonscan.com"]
            }]
            });
            } catch (addError) {
            // handle "add" error
            }
        }
    }
    try{
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", [])
        signer = await provider.getSigner();
        await setRecoil(providerState, provider);
    } catch (e){ console.log(e)}
    return await signer.getAddress();
}

export async function getAddr(setState, dontAutoConnect) {
    let address;
    if(dontAutoConnect){ //Just get stored address
        provider = getRecoil(providerState);
        if(provider){
            let signer = await provider.getSigner();
            address = await signer.getAddress();
            setRecoil(addressState, address)
            setState(address.toString().substring(0, 7) + "...")
        }else{
            setState("Connect Wallet")
        }
       
    } else{ //Web3 connect
        address = await getProvider();
        provider = getRecoil(providerState);
        setRecoil(addressState, address)
        setState(address.toString().substring(0, 7) + "...")
        await init();
        await getIdentity(address);
    }
}

async function getInvestors(projdb, dopotReward){
    const provider = getRecoil(providerState);
    const blockHeight = getRecoil(blockHeightState);
    
    const contract = new ethers.Contract(addressProjectFactory, abiProjectFactory, provider);
    let currentBlock = await provider.getBlockNumber();
    const endBlock = currentBlock;
    currentBlock = currentBlock - (39272 * 120); // Polygon blocks per day * 120 days
    const batchSize = 3500;
    if (blockHeight > currentBlock) currentBlock = blockHeight;

    while (currentBlock <= endBlock) {
        const nextBlock = Math.min(currentBlock + batchSize - 1, endBlock);
        const filterInvest = contract.filters.ProjectInvested(projdb.address);
        const eventsInvest = await contract.queryFilter(filterInvest, 0);
        for (const event of eventsInvest) {
            const tokenId = event.args.tokenId;
            const rewardBalance = (await dopotReward.balanceOf(event.args.investor, tokenId)).toNumber();
            if(rewardBalance > 0) {
                if(!projdb.investors[event.args.investor]) projdb.investors[event.args.investor] = {};
                projdb.investors[event.args.investor][tokenId] = rewardBalance;
            }
        }
        currentBlock = nextBlock + 1;
    }
    setRecoil(blockHeightState, endBlock);
}

async function getProjectFunds(addressProject){
    const provider = getRecoil(providerState);
    const dai = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    return await dai.balanceOf(addressProject);
}

export async function getInsuranceFunds(){
    const provider = getRecoil(providerState);
    const dai = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    return await dai.balanceOf(addressProjectFactory);
}

export async function downloadProjects() {
    const address = await getProvider()
    setRecoil(addressState, address)
    await init()
    const identity = await getIdentity(address)
    const identityObj = { wallet: address, privateKey: identity.privateKey };
    try{
        let projects = getRecoil(progettiState)
        const dopotReward = new Contract(addressDopotReward, abiDopotReward, getRecoil(providerState));
        //if(!projects || projects.length === 0){
            projects = await db.get("projects", identityObj)
            for(let projdb of projects){
                if(!projdb.address) continue;
                const project = new Contract(projdb.address, abiProject, getRecoil(providerState));
                const tiersLenghts = await project.getTiersLength();
                for(let t = 0; t < tiersLenghts; t++){
                    projdb.imageNftDefListFiles[t].currentSupply = (await dopotReward.currentSupplyByProjectAndURI(projdb.address, projdb.imageNftDefListFiles[t].uri)).toNumber()                    
                }
                projdb.investors = {};
                await getInvestors(projdb, dopotReward);
                projdb.investorsNumber = Object.keys(projdb.investors).length;
                const projectFunds = Math.round(ethers.utils.formatEther(await getProjectFunds(projdb.address)));
                projdb.funds = projectFunds || 0;
                const deadline = await project.fundRaisingDeadline();
                const now = new Date();
                const difference = deadline * 1000 - now;
                const seconds = Math.floor(difference / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                projdb.fundRaisingDeadline = days;
                projdb.minInvestment = Math.min(...projdb.imageNftDefListFiles.map(item => parseInt(item.price)));
                projdb.state = await project.state();
                if(days < 0 && projdb.state !== 0) projdb.state = 4;
                switch(projdb.state){
                    case 0:
                        projdb.stateText = "Pending Approval";
                        break;
                    case 1:
                        projdb.stateText = "Rejected";
                        break;
                    case 2:
                        projdb.stateText = "Ongoing";
                        break;
                    case 3:
                        projdb.stateText = "Successful";
                        if(projdb.funds === 0) projdb.funds = projdb.quota;
                        break;
                    case 4:
                        projdb.stateText = "Expired";
                        break;
                    case 5:
                        projdb.stateText = "Cancelled";
                        break;
                    default: break;
                  }
            //}
            setRecoil(progettiState, projects)
        }
    }   catch(e){console.log(e)}
    return true
}

export async function downloadProject(address) {
    await getProvider()
    const progetto = await db.get("projects", ["address"], [ "address", "==", address ])
    console.dir(progetto)
    return progetto
}

export async function getNftImage(tokenId) {
    getProvider()
    const provider = await getRecoil(providerState)
    const dopotReward = new Contract(addressDopotReward, abiDopotReward, provider);
    const result = await dopotReward.uri(tokenId);
    const response = await fetch(result.replace("ar://", "https://arweave.net/"));
    const data = await response.json();
    return {image: data.image, addressDopotReward};
}

export async function retriveInvestment() {
    let address = await getProvider()
    const provider = await getRecoil(providerState)
    await downloadProjects()
    const dopotReward = new Contract(addressDopotReward, abiDopotReward, provider);
    let projects = getRecoil(progettiState)
    console.dir(projects)
    let progettiInvested = [];
    for(const project of projects){
        progettiInvested.push(await dopotReward.uri(project.investors[address][0]-1))
    }
    console.dir(progettiInvested);

    return progettiInvested
}

export async function retriveFavorites() {
    await getProvider()
    //await init()
    let addressLogged=getRecoil(addressState)    
    const progettiFavourites =  await db.get("users", ["addressUser"], ["addressUser", "==", addressLogged.toString().toLowerCase()]);
    return (progettiFavourites && progettiFavourites.length > 0) ? progettiFavourites[0].addressProjects : [];
}

export function RetriveProjectTypes(tipoKey){
    const { t, i18n } = useTranslation();
    const types = {
        tipo1: t("socialcare"),
        tipo2: t("healthcare"),
        tipo3: t("socialhealthass"),
        tipo4: t("educationtraining"),
        tipo5: t("environmental"),
        tipo6: t("enhancementcultural"),
        tipo7: t("socialtourism"),
        tipo8: t("universitypost"),
        tipo9: t("extracurricular"),
        tipo10: t("socialenterprises"),
        tipo11: t("blockchainfinance"),
        tipo12: t("blockchaininsurance"),
        tipo13: t("blockchainpaydigital"),
        tipo14: t("blockchainagrifood"),
        tipo15: t("blockchain4.0"),
        tipo16: t("blockchainiot"),
        tipo17: t("blockchainhealthcare"),
        tipo19: t("blockchainretail"),
        tipo20: t("blockchainmusic"),
        tipo21: t("blockchainsmartenergy"),
        tipo22: t("blockchainunbanked"),
        tipo23: t("cryptostartup"),
        tipo24: t("decentralizedstartup"),
        tipo25: t("decentralizedproject"),
        tipo26: t("foodstartup"),
        tipo27: t("fashionstartup"),
        tipo28: t("wearstartup"),
        tipo29: t("travelstartup"),
        tipo30: t("bigdata"),
        tipo31: t("biotechnology"),
        tipo32: t("ecosustainability"),
        tipo33: t("engineering"),
        tipo34: t("mobile"),
        tipo35: t("modelling"),
        tipo36: t("research"),
        tipo37: t("software"),
        tipo38: t("power"),
        tipo39: t("artificialintelligence"),
        tipo40: t("science"),
        tipo41: t("work"),
        tipo42: t("telecommunications"),
        tipo43: t("robot"),
        tipo44: t("pharmaceutical"),
        tipo45: t("foodandwater"),
        tipo46: t("education"),
        tipo47: t("humanlife"),
        tipo48: t("publicadministration"),
        tipo49: t("augmentedreality"),
        tipo50: t("programming"),
        tipo51: t("showbusiness"),
        tipo52: t("automation"),
        tipo53: t("tech"),
        tipo54: t("emergingcountries"),
        tipo55: t("businesssoftware"),
        tipo57: t("manufacturing"),
        tipo58: t("games"),
        tipo59: t("music"),
        tipo60: t("realestate"),
        tipo61: t("investment"),
        tipo62: t("educationaltechnology"),
        tipo63: t("ionnovation"),
        tipo64: t("credit"),
        tipo65: t("insurance"),
        tipo66: t("agriculturaltecno"),
        tipo67: t("aerospace"),
        tipo68: t("hitech"),
      };
      return types[tipoKey];
}