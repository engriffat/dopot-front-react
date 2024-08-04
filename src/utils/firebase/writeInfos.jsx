"use client"
import { getPushUser, getIdentity, init, db } from "./firebaseInit.jsx"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState, providerState, progettiState } from '../../recoilState.js';
import { genproj, bundlrFund, bundlrAdd, contrattoProjectAddTier, initialiseBundlr, webIrys } from "../genproj.jsx"
import { getProvider, downloadProjects } from "./retriveInfo.jsx";
import addressFundingToken  from '../../abi/fundingToken/address.js';
import addressDpt from '../../abi/dpt/address.js';
const abiProject = require('../../abi/project/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const abiDpt = require('../../abi/dpt/1.json');
const { ethers } = require("ethers");

const pushChannelAddress = "0x63381e4b8fe26cb1f55cc38e8369990594e017b1";
const env = "prod";


async function optInNotifications() {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress();
  const pushUser = await getPushUser();
  const subscriptions = await pushUser.notification.subscriptions({ user: `eip155:42161:${address}`, env });
  console.dir(subscriptions)
  if(!subscriptions.some(r => r.channel === pushChannelAddress)){
    const subscribeStatus = await pushUser.notification.subscribe(`eip155:42161:${pushChannelAddress}`);
    console.dir(subscribeStatus);
  }
}

async function pushChatSend(projectCreatorAddress, content) {
  const signer = getRecoil(providerState).getSigner();
  const pushUser = await getPushUser();
  const params = {
    content,
    type: 'Text',
    signer,
    //pgpPrivateKey: pgpDecryptedPvtKey,
    //env
  }
  const response = await pushUser.chat.send(`eip155:${projectCreatorAddress}`, params);
  console.dir(response);
}

export async function addproj(inputs, t) {
  const address = await getProvider();
  await init();
  setRecoil(addressState, address);
  !webIrys && await initialiseBundlr(getRecoil(providerState));
  let domanda = [];
  Object.keys(inputs).forEach(key => {
    if (key.startsWith("domanda")) {
      domanda.push(inputs[key]);
      delete inputs[key]; 
    }
  });
  
  inputs.domanda = domanda;

  console.log("Adding project")
  inputs.addressCreator = address
  let identity = await getIdentity(t, db)
  console.dir(identity)
  //identity.linkedAccount = identity.address
  await bundlrFund();
  inputs.address = await genproj(inputs);
  async function updateListFiles(listFiles, contentType) {
    const updatedElements = await Promise.all(
      listFiles.map(async (element) => {
        if(element.buff) element = element.buff;
        const { id } = await bundlrAdd(element, { 
          name: "Content-Type", 
          value: contentType 
        });
        return id;
      })
    );
    return updatedElements;
  }
  
  let inputKeys = [
    { key: 'documentazioneListFiles', contentType: 'application/pdf' },
    { key: 'fotoProdotto1ListFiles', contentType: 'image/' + inputs.fotoProdotto1ListFiles[0].fileExtension },
    { key: 'logoAziendaListFiles', contentType: 'image/png' },
  ];
  inputs.fotoProdotto2ListFiles && inputKeys.push({ key: 'fotoProdotto2ListFiles', contentType: 'image/' + inputs.fotoProdotto2ListFiles[0].fileExtension });
  inputs.fotoProdotto3ListFiles && inputKeys.push({ key: 'fotoProdotto3ListFiles', contentType: 'image/' + inputs.fotoProdotto3ListFiles[0].fileExtension });
  inputs.fotoProdotto4ListFiles && inputKeys.push({ key: 'fotoProdotto4ListFiles', contentType: 'image/' + inputs.fotoProdotto4ListFiles[0].fileExtension });

  for (const input of inputKeys) {
    inputs[input.key] = await updateListFiles(inputs[input.key], input.contentType);
  }
  const inputsNoTiers = {...inputs};
  inputsNoTiers.imageNftDefListFiles = []
  try{
    const tiers = await contrattoProjectAddTier(inputs);
    inputsNoTiers.imageNftDefListFiles = tiers;
    if(typeof inputsNoTiers.giorniCampagna === 'number') inputsNoTiers.giorniCampagna = inputsNoTiers.giorniCampagna.toString();
    console.dir(inputsNoTiers);
    const result = await db.set(inputsNoTiers, "projects", inputsNoTiers.address, identity );
    console.log(result);
    await optInNotifications();

    await downloadProjects(t);
  } catch (e) {
    console.log(e)
  }
  
}

export async function addFavorites(addressProject, t) {
  let address = await getProvider();
  address = address.toLowerCase();
  let identity = await getIdentity(t, db)
  //identity.linkedAccount = address
  //identity.signer = address
  //identity.address = address
  try {
    let result =  await db.cget("users", ["addressUser"], ["addressUser", "==", address]);
    if(!result[0] || !result[0].data){
      const obj = {addressUser: address, addressProjects: [ addressProject ], shippingNft: {}, projectStakes: []}
      await db.set(obj, "users", address, identity)
    }
    else{
      let addressProjects = result[0].data.addressProjects;
      addressProjects && addressProjects.includes(addressProject) ? addressProjects.splice(addressProjects.indexOf(addressProject), 1) : addressProjects.push(addressProject);
      await db.update(result[0].data, "users", result[0].id, identity)
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addProjectStake(addressProject, amount, t) {
  let address = await getProvider();
  address = address.toLowerCase();
  let identity = await getIdentity(t, db)
  console.dir(identity);
  //identity.linkedAccount = address
  //identity.signer = address
  //identity.address = address
  try {
    const newStake = { timestamp: new Date().getTime(), amount, address: addressProject }
    let result =  await db.cget("users", ["addressUser"], ["addressUser", "==", address]);
    if(!result[0] || !result[0].data){
      const obj = {addressUser: address, addressProjects: [], shippingNft: {}, projectStakes: [ newStake ]};
      console.dir(obj);
      await db.set(obj, "users", address, identity)
    }
    else{
      let projectStakes = result[0].data.projectStakes;
      if(projectStakes) projectStakes.push(newStake);
      else result[0].data.projectStakes = [ newStake ];
      console.log(result[0].data)
      await db.update(result[0].data, "users", result[0].id, identity)
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addShippingDetailsNft(projectAddress, tokenId, shippingDetails, title) {
  const result =  await db.get("projects", ["address"], ["address", "==", projectAddress]);
  await pushChatSend(result[0].addressCreator, `Project ${title}, Token Id ${tokenId}, Shipping Details ${shippingDetails}` )
}

export async function refundNft(project, tokenId, t) {
  console.log(project, tokenId);
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner();
  const pWithSigner = projectContract.connect(signer);

  try {
    const tx = await pWithSigner.refund(tokenId, {
      gasLimit: 1000000 // Adjust the gas limit as needed
    });
    await tx.wait(1);
    setRecoil(progettiState, null);
    if (typeof window !== "undefined") window.location.href = "/";
  } catch (e) {
    console.error(e);
  }
}


async function allowDptPay(signer, projectContract, project, amount){
  const address = await getProvider();
  if(await projectContract.dptAddressesSet()){
    const infinite = /*amount ||*/ "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const dptContract = new ethers.Contract(addressDpt, abiDpt, signer);
    const fWithSigner = dptContract.connect(signer);
    const allowance = await dptContract.allowance(address, project);
    if (allowance.lt(infinite)){
      const tx = await fWithSigner.approve(project, infinite);
      await tx.wait(1);
    } else console.log("Skipping dpt allowance")
  } else console.log("Skipping dpt allowance")
}

export async function getPWithSigner(project){
  const provider = getRecoil(providerState);
  const signer = provider.getSigner();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  return projectContract.connect(signer);
}

export async function getWithdrawalFees(pWithSigner){
  const fees = (await pWithSigner.getWithdrawalFee()).add((await pWithSigner.getStakingRewards()));
  console.log(fees.toString());
  return fees;
}

export async function withdraw(project) {
  const provider = getRecoil(providerState);
  const signer = provider.getSigner();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const pWithSigner = projectContract.connect(signer);

  if(await pWithSigner.dptAddressesSet()) {
    const amount = await getWithdrawalFees(pWithSigner);
    await allowDptPay(signer, projectContract, project, amount);
  }
  try {
    await pWithSigner.withdraw(); // still asking me to pay way to much dpt
  } catch (e) {
    console.error(e);
  }
}

export async function stakeProject(project, amount, t) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  await allowDptPay(signer, projectContract, project, amount);
  try {
    const tx = await pWithSigner.stake(ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait(1);
    await addProjectStake(project, amount, t) 
  } catch (e) {
    console.error(e);
  }
}

export async function unstakeProject(project) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  try {
    const tx = await pWithSigner.unstake();
    await tx.wait(1);
  } catch (e) {
    console.error(e);
  }
}

export async function postpone(project) {
  const provider = getRecoil(providerState);
  await getProvider();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  await allowDptPay(signer, projectContract, project);
  try {
    await pWithSigner.postponeDeadline();
  } catch (e) {
    console.error(e);
  }
}

export async function addInvestment(pAddress, numTier, price, title, t) {
  const amount = ethers.utils.parseEther(price);
  numTier--;
  try {
    const address = await getProvider();
    const provider = getRecoil(providerState);
    const signer = provider.getSigner();
    const projectContract = new ethers.Contract(pAddress, abiProject, signer);
    const pWithSigner = projectContract.connect(signer);
    const fundingTokenContract = new ethers.Contract(addressFundingToken, abiFundingToken, signer);
    const fWithSigner = fundingTokenContract.connect(signer);
    const allowance = await fundingTokenContract.allowance(address, pAddress);
    if (!allowance.gte(price)){
      const tx = await fWithSigner.approve(pAddress, amount);
      await tx.wait(1);
    }
    const tx = await pWithSigner.invest(numTier);
    await tx.wait(1);
    const shippingDetails = typeof window !== "undefined" ? window.prompt(t("shippingDetails")): "";
    await addShippingDetailsNft(pAddress, title, shippingDetails, title);
    await optInNotifications();
    await downloadProjects(t);
  } catch (e) {
    console.error(e);
  }
}