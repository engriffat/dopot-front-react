"use client"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState, progettiState, blockHeightState, providerState } from '../../recoilState.js';
import { db, getIdentity, init } from './firebaseInit.jsx';
import addressProjectFactory from '../../abi/projectFactory/address.js';
import addressFundingToken from '../../abi/fundingToken/address.js';
import addressDopotReward from '../../abi/dopotReward/address.js';
import { useTranslation } from "../../i18n/client.js";
import Web3 from 'web3'
const { ethers, Contract } = require("ethers");
const abiProject = require('../../abi/project/1.json');
const abiProjectFactory = require('../../abi/projectFactory/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const abiDopotReward = require('../../abi/dopotReward/1.json');
let investorsLenght;

export async function getProvider() {
    if (!window.ethereum) return;
    let signer;
    try {
        if (typeof window !== "undefined") {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xa4b1' }],
            });
        }
    } catch (switchError) {
        if (switchError.code === 4902 && typeof window !== "undefined") {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: "0xa4b1",
                        // rpcUrls: ["https://arbitrum-mainnet.infura.io/v3/cdb16b02bd2d4b5e8e402a07d9bc2bb5"],
                        rpcUrls: ["https://arbitrum.drpc.org"],
                        // rpcUrls: ["https://endpoints.omniatech.io/v1/arbitrum/one/public"],
                        chainName: "Arbitrum One",
                        nativeCurrency: {
                            name: "ETH",
                            symbol: "ETH",
                            decimals: 18
                        },
                        blockExplorerUrls: ["https://arbiscan.io"]
                    }]
                });
            } catch (addError) {
                // handle "add" error
            }
        }
    }
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", [])
        signer = provider.getSigner();
        setRecoil(providerState, provider);
    } catch (e) { console.log(e) }
    return await signer.getAddress();
}

export async function getAddr(setState, dontAutoConnect, t) {
    let address;
    if (dontAutoConnect) { //Just get stored address
        const provider = getRecoil(providerState);
        if (provider) {
            let signer = await provider.getSigner();
            address = await signer.getAddress();
            setRecoil(addressState, address)
            setState(address.toString().substring(0, 7) + "...")
        } else {
            setState("Connect Wallet")
        }

    } else { //Web3 connect
        address = await getProvider();
        setRecoil(addressState, address)
        setState(address.toString().substring(0, 7) + "...")
        await init();
        await getIdentity(t);
    }
}

async function getInvestors(projdb, dopotReward) {
    // console.log("🚀 ~ getInvestors ~ projdb:", projdb)
    console.log("🚀 ~ getInvestors ~ projdb:", projdb.address)

    try {

        const web3 = new Web3("https://arbitrum-mainnet.infura.io/v3/cdb16b02bd2d4b5e8e402a07d9bc2bb5")
        // const instance = new web3.eth.Contract(abiProject,addressProjectFactory)
        const instance = new web3.eth.Contract(abiProjectFactory, addressProjectFactory)
        const events = await instance.getPastEvents('ProjectInvested', {
            filter: { projectAddress: projdb.address },
            fromBlock: 0,
            toBlock: 'latest'
        });
        let counter = 0
        let investor;
        let projectAddress;
        let rewardBalance;


        events.forEach(async (event) => {
            counter += 1
            investor = event.returnValues.investor;
            projectAddress = event.returnValues.project;
            const tokenId = event.returnValues.tokenId;
            try {
                rewardBalance = (await dopotReward.balanceOf(investor, tokenId)).toNumber();


            } catch (error) {
                console.log("🚀 ~ events.forEach ~ error:", error)

            }
            if (rewardBalance > 0 && projectAddress == projdb.address) {
                if (!projdb.investors[investor]) projdb.investors[investor] = {};
                projdb.investors[investor][tokenId] = rewardBalance;
            }
        });
        console.log(counter)
        if (projectAddress == projdb.address) {


            projdb.investorsNumber = counter > 0 ? counter : 0;
        }


        // const contract = instance.methods
        // const provider = getRecoil(providerState);
        // const blockHeight = getRecoil(blockHeightState);

        // const contract = new Contract(addressProjectFactory, abiProjectFactory, provider);
        // let currentBlock = await provider.getBlockNumber();
        // const endBlock = currentBlock;
        // currentBlock = 235359709  // Arbitrum blocks per day * 120 days
        // currentBlock = currentBlock - (337510 * 120); // Arbitrum blocks per day * 120 days
        // const batchSize = 5000; // 5k public rpc - 20k private rpc
        // const batchSize = 5000; // 5k public rpc - 20k private rpc
        // if (blockHeight > currentBlock) currentBlock = blockHeight;


        // while (currentBlock <= endBlock) {
        // const nextBlock = Math.min(currentBlock + batchSize - 1, endBlock);
        // console.log("🚀 ~ getInvestors ~ projdb.address:", projdb.address)
        // console.log("🚀 ~ getInvestors ~ contract.filters.ProjectInvested:", await contract.filters.ProjectInvested(projdb.address))
        // const filterInvest = await contract.filters.ProjectInvested(projdb.address) ;
        // console.log("🚀 ~ getInvestors ~ filterInvest:", filterInvest)
        // const eventsInvest = await contract.queryFilter(filterInvest, 0, 'latest');
        // console.log("🚀 ~ getInvestors ~ eventsInvest:", eventsInvest)



        // for (const event of eventsInvest) {
        // const tokenId = events.args.tokenId;
        // const rewardBalance = (await dopotReward.balanceOf(events.args.investor, tokenId)).toNumber();
        // if (rewardBalance > 0) {
        //     if (!projdb.investors[events.args.investor]) projdb.investors[events.args.investor] = {};
        //     projdb.investors[events.args.investor][tokenId] = rewardBalance;
        // }
        // }
        // currentBlock = nextBlock + 1;
        // console.log(currentBlock)
        // }
        setRecoil(blockHeightState);

    } catch (error) {
        console.log("🚀 ~ getInvestors ~ error:", error)

    }
}

async function getProjectFunds(addressProject) {
    const provider = getRecoil(providerState);
    const dai = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    return await dai.balanceOf(addressProject);
}

export async function getInsuranceFunds() {
    const provider = getRecoil(providerState);
    const dai = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    return await dai.balanceOf(addressProjectFactory);
}

export async function downloadProjects(t) {
    // console.log('inside here----')
    const web3 = new Web3("https://arbitrum-mainnet.infura.io/v3/cdb16b02bd2d4b5e8e402a07d9bc2bb5")
    const address = await getProvider()
    setRecoil(addressState, address)
    await init()
    try {
        const dopotReward = new Contract(addressDopotReward, abiDopotReward, getRecoil(providerState));
        // console.log("🚀 ~ downloadProjects ~ dopotReward:", dopotReward)
        let projects = await db.get("projects"/*, identity*/);
        console.log("🚀 ~ downloadProjects ~ project from database s:----", projects)
        // console.log("🚀 ~ downloadProjects ~ projects:", projects)
        // console.dir(projects)
        for (let projdb of projects) {
            const instance = new web3.eth.Contract(abiProject, projdb.address)
            if (!projdb.address) continue;
            const project = new Contract(projdb.address, abiProject, getRecoil(providerState));
            // const tiersLenghts = 3
            const tiersLenghts = await project.getTiersLength();

            for (let t = 0; t < tiersLenghts; t++) {
                try {
                    // projdb.imageNftDefListFiles[t].currentSupply = 2
                    projdb.imageNftDefListFiles[t].currentSupply = 0
                    // projdb.imageNftDefListFiles[t].currentSupply = (await dopotReward.currentSupplyByProjectAndURI(projdb.address, projdb.imageNftDefListFiles[t]?.uri)).toNumber()

                } catch (error) {
                    console.log("🚀 ~ downloadProjects ~ error:--", error)
                }
            }

            projdb.investors = {};
            await getInvestors(projdb, dopotReward);
            console.log("🚀 ~ downloadProjects ~ projdb:-------object", Object.keys(projdb.investors))
            // projdb.investorsNumber = Object.keys(projdb.investors).length;
            console.log("🚀 ~ downloadProjects ~ projdb.investors:------2", projdb.investors)
            const projectFunds = Math.round(Number(ethers.utils.formatEther(await getProjectFunds(projdb.address))));
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
            projdb.totalStaked = typeof project.totalStaked === 'function' ? (await project.totalStaked()).toString().replace(/\d{18}$/, '') : 0;

            if (days < 0 && projdb.state !== 0) projdb.state = 4;
            switch (projdb.state) {
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
                    if (projdb.funds === 0) projdb.funds = projdb.quota;
                    break;
                case 4:
                    projdb.stateText = "Expired";
                    break;
                case 5:
                    projdb.stateText = "Cancelled";
                    break;
                default: break;
            }
            setRecoil(progettiState, projects)
        }
    } catch (e) { console.log(e, '-----') }
    return true
}

export async function downloadProject(address) {
    await getProvider()
    const progetto = await db.get("projects", ["address"], ["address", "==", address])
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
    return { image: data.image, addressDopotReward };
}

export async function retriveInvestment(t) {
    let address = await getProvider()
    const provider = await getRecoil(providerState)
    await downloadProjects(t)
    const dopotReward = new Contract(addressDopotReward, abiDopotReward, provider);
    let projects = getRecoil(progettiState)
    console.dir(projects)
    let progettiInvested = [];
    for (const project of projects) {
        progettiInvested.push(await dopotReward.uri(project.investors[address][0] - 1))
    }
    console.dir(progettiInvested);

    return progettiInvested
}

export async function retriveFavorites() {
    await getProvider()
    const db_local = await init()
    let addressLogged = getRecoil(addressState);
    console.log(addressLogged);
    const progettiFavourites = await db_local?.get("users", ["addressUser"], ["addressUser", "==", addressLogged.toString().toLowerCase()]);
    return (progettiFavourites && progettiFavourites.length > 0) ? progettiFavourites[0].addressProjects : [];
}

export async function retriveProjectStakes(projectAddress) {
    await getProvider()
    //await init()
    let addressLogged = getRecoil(addressState)
    const progettiStakes = await db.get("users", ["addressUser"], ["addressUser", "==", addressLogged?.toString().toLowerCase()]);
    return (progettiStakes && progettiStakes.length > 0) ? progettiStakes[0].projectStakes?.filter(e => e.address === projectAddress) : [];
}

export function RetriveProjectTypes(tipoKey) {
    const { t } = useTranslation();
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