import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState , progettiState, providerState } from '../../recoilState';
import { db, getIdentity, init } from './firebaseInit';
import addressProjectFactory from '../../abi/projectFactory/address.js';
import addressFundingToken from '../../abi/fundingToken/address.js';
import addressDopotReward from '../../abi/dopotReward/address.js';
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
                rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
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
    if(dontAutoConnect){
        provider = getRecoil(providerState);
        if(provider){
            let signer = await provider.getSigner();
            address = await signer.getAddress();
            setRecoil(addressState, address)
            setState(address.toString().substring(0, 7) + "...")
        }else{
            setState("Connect Wallet")
        }
       
    } else{
        address = await getProvider();
        provider = getRecoil(providerState);
        setRecoil(addressState, address)
        setState(address.toString().substring(0, 7) + "...")
    }
}

async function getInvestors(projdb, dopotReward){
    const provider = getRecoil(providerState);
    const contract = new ethers.Contract(addressProjectFactory, abiProjectFactory, provider);
    let currentBlock = await provider.getBlockNumber();
    const endBlock = currentBlock;
    currentBlock = currentBlock - 1200000; // 30 days
    const batchSize = 3500;
    
    while (currentBlock <= endBlock) {
        const nextBlock = Math.min(currentBlock + batchSize - 1, endBlock);
        const filterInvest = contract.filters.ProjectInvested(projdb.address);
        const eventsInvest = await contract.queryFilter(filterInvest, 0);
        for (const event of eventsInvest) {
            const tokenId = event.args.tokenId;
            if(!projdb.investors[event.args.investor]) projdb.investors[event.args.investor] = {};
            projdb.investors[event.args.investor][tokenId] = (await dopotReward.balanceOf(event.args.investor, tokenId)).toNumber();
        }
        currentBlock = nextBlock + 1;
    }
}

async function getProjectFunds(addressProject){
    const provider = getRecoil(providerState);
    const dai = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    return await dai.balanceOf(addressProject);
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
        if(!projects || projects.length === 0){
            projects = await db.get("projects", identityObj)
            for(let projdb of projects){
                const project = new Contract(projdb.address, abiProject, getRecoil(providerState));
                const tiersLenghts = await project.getTiersLength();
                for(let t = 0; t < tiersLenghts; t++){
                    projdb.imageNftDefListFiles[t].currentSupply = (await dopotReward.currentSupplyByProjectAndURI(projdb.address, projdb.imageNftDefListFiles[t].uri)).toNumber()                    
                }
                projdb.investors = {};
                await getInvestors(projdb, dopotReward);
                projdb.investorsNumber = Object.keys(projdb.investors).length;
                projdb.funds = Math.round(ethers.utils.formatEther(await getProjectFunds(projdb.address)));
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
                        break;
                    case 4:
                        projdb.stateText = "Expired";
                        break;
                    case 5:
                        projdb.stateText = "Cancelled";
                        break;
                    default: break;
                  }
            }
            setRecoil(progettiState, projects)
        }
    }   catch(e){console.log(e)}
    return true
}

export async function downloadProject(address) {
    getProvider()
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
    await init()
    var addressLogged=getRecoil(addressState)    
    const progettiFavourites =  await db.get("users", ["addressUser"], ["addressUser", "==", addressLogged.toString().toLowerCase()]);
    return (progettiFavourites && progettiFavourites.length > 0) ? progettiFavourites[0].addressProjects : []
}
