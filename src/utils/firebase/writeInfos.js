import { db, getIdentity, init } from "./firebaseInit"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState, providerState } from '../../recoilState';
import { genproj, bundlrAdd, contrattoProjectAddTier } from "../genproj"
import { getProvider, provider } from "./retriveInfo";
import addressFundingToken  from '../../abi/fundingToken/address.js';
import addressDpt from '../../abi/dpt/address.js';
import { downloadProjects } from "./retriveInfo";
import * as PushAPI from '@pushprotocol/restapi';
const abiProject = require('../../abi/project/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const abiDpt = require('../../abi/dpt/1.json');
const { ethers } = require("ethers");
const pushMainnetAddress = "0xd52b78d9ba494e5bdcc874dc3c369f2735e24fb3"; //should be the same as polygon, lowercase
const pushPolygonAddress = "0x340cb0AA007F2ECbF6fCe3cd8929a22429893213";
const env = "staging"; // prod/staging

async function optInNotifications() {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress();
  const subscriptions = await PushAPI.user.getSubscriptions({
    user: `eip155:80001:${address}`, // user address in CAIP
    env
  });
  if(!subscriptions.some(r => r.channel === pushMainnetAddress))
  await PushAPI.channels.subscribe({
    signer,
    channelAddress: 'eip155:80001:' + pushPolygonAddress, // channel address in CAIP
    userAddress: 'eip155:80001:' + address, // user address in CAIP
    onSuccess: () => {
      console.log('opt in success');
    },
    onError: (e) => {
      console.error(e);
    },
    env: 'staging'
  })
}

async function getPushChatUser() {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress();
  let user = await PushAPI.user.get({
    account: `eip155:${address}`,
    env,
  });
  ;
  return user ? user : await PushAPI.user.create({
    signer,
    env
  });
}

async function pushChatSend(pushUser, projectCreatorAddress, messageContent) {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress();

  const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: pushUser.encryptedPrivateKey, 
    signer
  });
  const params = {
    messageContent,
    messageType: 'Text',
    receiverAddress: `eip155:${projectCreatorAddress}`,
    signer,
    pgpPrivateKey: pgpDecryptedPvtKey,
    env
  }
  console.dir(params)
  const response = await PushAPI.chat.send(params);
  console.dir(response);
}

export async function addproj(inputs) {
  const address = await getProvider();
  await init();
  setRecoil(providerState, provider);
  setRecoil(addressState, address);
  console.log("Adding project")
  inputs.addressCreator = address
  const identity = await getIdentity(address)
  inputs.address = await genproj(inputs);
  //console.dir(inputs)
  async function updateListFiles(listFiles, contentType) {
    return await Promise.all(
      listFiles.map(async (element) => {
        const updatedElement = (await bundlrAdd(element, { name: "Content-Type", value: contentType })).id;
        return updatedElement;
      })
    );
  }
  
  let inputKeys = [
    { key: 'documentazioneDefListFiles', contentType: 'application/pdf' },
    { key: 'fotoProdotto1ListFiles', contentType: 'image/png' },
    { key: 'logoAziendaListFiles', contentType: 'image/png' },
  ];
  inputs.fotoProdotto2ListFiles && inputKeys.push({ key: 'fotoProdotto2ListFiles', contentType: 'image/png' });
  inputs.fotoProdotto3ListFiles && inputKeys.push({ key: 'fotoProdotto3ListFiles', contentType: 'image/png' });
  inputs.fotoProdotto4ListFiles && inputKeys.push({ key: 'fotoProdotto4ListFiles', contentType: 'image/png' });
  for (const input of inputKeys) {
    inputs[input.key] = await updateListFiles(inputs[input.key], input.contentType);
  }
  const inputsNoTiers = Object.assign({},inputs);
  inputsNoTiers.imageNftDefListFiles = []
  try{
    const tiers = await contrattoProjectAddTier(inputs);
    inputsNoTiers.imageNftDefListFiles = tiers;
    console.dir(inputsNoTiers);
    const result = await db.add(inputsNoTiers, "projects", {
      wallet: address,
      privateKey: identity.privateKey,
    });
    console.log(result);
    await optInNotifications();

    await downloadProjects();
  } catch (e) {
    console.log(e)
  }
  
}

export async function addFavorites(addressProject) {
  let addressLogged=getRecoil(addressState).toString()
  const identity = await getIdentity(addressLogged)
  const identityObj = { wallet: addressLogged, privateKey: identity.privateKey };
  try {
    let result =  await db.cget("users", ["addressUser"], ["addressUser", "==", addressLogged.toLowerCase()]);
    if(!result[0] || !result[0].data)
      await db.add({addressUser: addressLogged.toLowerCase(), addressProjects: [ addressProject ], shippingNft: {}}, "users", identityObj)
    else{
      let addressProjects = result[0].data.addressProjects;
      addressProjects && addressProjects.includes(addressProject) ? addressProjects.splice(addressProjects.indexOf(addressProject), 1) : addressProjects.push(addressProject);
      await db.update(result[0].data, "users", result[0].id, identityObj)
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addShippingDetailsNft(projectAddress, tokenId, shippingDetails, title) {
  const result =  await db.get("projects", ["address"], ["address", "==", projectAddress]);
  const pushChatUser = await getPushChatUser();
  await pushChatSend(pushChatUser, result[0].addressCreator, `$Project {title}, Token Id ${tokenId}, Shipping Details ${shippingDetails}` )
}

export async function refundNft(project, tokenId) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  try {
    await pWithSigner.refund(tokenId);
  } catch (e) {
    console.error(e);
  }
}

export async function withdraw(project, discountDPT) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  

  const infinite = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  if(discountDPT){
    const dptContract = new ethers.Contract(addressDpt, abiDpt, signer);
    const fWithSigner = dptContract.connect(signer);
    const allowance = await dptContract.allowance(provider, project);
    if (!allowance.eq(infinite)){
      const tx = await fWithSigner.approve(project, infinite);
      await tx.wait(1);
    }
  }
  else {
    const fundingTokenContract = new ethers.Contract(addressFundingToken, abiFundingToken, signer);
    const fWithSigner = fundingTokenContract.connect(signer);
    const allowance = await fundingTokenContract.allowance(provider, project);
    if (!allowance.eq(infinite)){
      const tx = await fWithSigner.approve(project, infinite);
      await tx.wait(1);
    }
  }
  try {
    await pWithSigner.withdraw(discountDPT);
  } catch (e) {
    console.error(e);
  }
}

export async function postpone(project) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  try {
    await pWithSigner.postponeDeadline();
  } catch (e) {
    console.error(e);
  }
}

export async function addInvestment(pAddress, numTier, price, title) {
  const amount = ethers.utils.parseEther(price);
  numTier--;
  let addressLogged=getRecoil(addressState)
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
    const shippingDetails = window.prompt("Enter your shipping details:");
    await addShippingDetailsNft(pAddress, title, shippingDetails, title);
    await optInNotifications();
    await downloadProjects();
  } catch (e) {
    console.error(e);
  }
}