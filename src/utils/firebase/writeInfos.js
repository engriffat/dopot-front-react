import { db, getIdentity, init } from "./firebaseInit"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState, providerState } from '../../recoilState';
import { genproj, bundlrAdd, contrattoProjectAddTier } from "../genproj"
import { fileToBase64, filelistToBase64 } from "../base64utils";
import { getProvider, provider } from "./retriveInfo";
import addressFundingToken  from '../../abi/fundingToken/address.js';
import { downloadProjects } from "./retriveInfo";
import { hexlify } from 'ethers/lib/utils'
import * as PushAPI from '@pushprotocol/restapi';
const abiProject = require('../../abi/project/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const { ethers, Contract } = require("ethers");
const ascii85 = require('ascii85');
const pushMainnetAddress = "0xd52b78d9ba494e5bdcc874dc3c369f2735e24fb3"; //should be the same as polygon, lowercase
const pushPolygonAddress = "0x340cb0AA007F2ECbF6fCe3cd8929a22429893213";

async function optInNotifications() {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress(); console.log(address)
  const subscriptions = await PushAPI.user.getSubscriptions({
    user: 'eip155:80001:' + address, // user address in CAIP
    env: 'staging'
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

async function convertToBase64(input) {
  var tInput=input
  // Funzione per la conversione in base64
  function  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  const promises = [];

  // Itera l'input e converte i file in base64
  for (const key in input) {
    if (key.endsWith("ListFiles")) {
      const fileList = input[key];
      const newFileList = {};
      for (const fileKey in fileList) {
        const file = fileList[fileKey];
        if (file instanceof File) {
          promises.push(
          convertFileToBase64(file).then((base64) => {
            tInput[key] = {base64};
            console.log(tInput)
          }));
        }
      }

      input[key] = newFileList;
    }
  }

  await Promise.all(promises);

  // Ritorna l'input con i file convertiti
  return tInput;
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

export async function addShippingDetailsNft(project, tokenId, shippingDetails) {
  let addressLogged=getRecoil(addressState).toString()
  const identity = await getIdentity(addressLogged)
  const identityObj = { wallet: addressLogged, privateKey: identity.privateKey };
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const creatorPublicEncryptionKey = await projectContract.creatorPublicEncryptionKey()
  const encryptedData = shippingDetails; //encryptData(Buffer.from(creatorPublicEncryptionKey.slice(2), "hex"), shippingDetails).toString('hex');
  try {
    let result =  await db.cget("users", ["addressUser"], ["addressUser", "==", addressLogged.toLowerCase()]);
    //await db.delete("users", result[0].id, identityObj); return;
    if(!result[0] || !result[0].data)
      await db.add({addressUser: addressLogged.toLowerCase(), addressProjects: [], shippingNft: {[tokenId]: encryptedData}}, "users", identityObj)
    else{
      console.dir(result[0])
      result[0].data.shippingNft[tokenId] = encryptedData;
      await db.update(result[0].data, "users", result[0].id, identityObj)
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
  try {
    await pWithSigner.withdraw(discountDPT);
  } catch (e) {
    console.error(e);
  }
}

export async function addInvestment(pAddress, numTier, price) {
  const amount = ethers.utils.parseEther(price);
  numTier--;
  let addressLogged=getRecoil(addressState)
  try {
    /*const address = await getProvider();
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
    await addShippingDetailsNft(pAddress, numTier, shippingDetails);*/
    await optInNotifications();
    //await downloadProjects();
  } catch (e) {
    console.error(e);
  }
}