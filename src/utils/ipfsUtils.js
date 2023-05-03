import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { createLibp2p } from 'libp2p'
import { MemoryBlockstore } from 'blockstore-core'
import { MemoryDatastore } from 'datastore-core'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { webSockets } from '@libp2p/websockets'
import { bootstrap } from '@libp2p/bootstrap'

import { blobToBase64 } from "./base64utils";
import all from 'it-all';
import { concat } from 'uint8arrays/concat'
const { ethers } = require("ethers");
const { ethereum } = window;

let provider, account, address, ipfs, fs;
async function initIPFS() {
    provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    account = provider.getSigner();
    address=await account.getAddress();

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
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
      // handle other "switch" errors
    }
  
    const blockstore = new MemoryBlockstore()
    const datastore = new MemoryDatastore()
    const libp2p = await createLibp2p({
      datastore,
      transports: [
        webSockets()
      ],
      connectionEncryption: [
        noise()
      ],
      streamMuxers: [
        yamux()
      ],
      peerDiscovery: [
        bootstrap({
          list: [
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt'
          ]
        })
      ]
    })
    ipfs = await createHelia({datastore, blockstore, libp2p});
    fs = unixfs(ipfs)
}

async function getAddress() {
    return address;
}
function getIPFS() {
    return ipfs;
}

async function getJSON(param) {
  console.log(param);
  try {
    let data;
    const stream = fs.cat(param, { cidVersion: 1 });
    const decoder = new TextDecoder();
    const dataPromise = (async () => {
      for await(const chunk of stream) {
        const tempdata = decoder.decode(chunk, { stream: true });
        if(tempdata !== null) data += tempdata;
      }
      return data;
    })();
    const timeoutPromise = new Promise((resolve, reject) => {
      const time = .5 * 1000;
      setTimeout(() => {
        reject(new Error(`getJSON()\n${param}\n timed out after ${time}ms`));
      }, time);
    });
    let result = await Promise.race([dataPromise, timeoutPromise]);
    result = result.replace("undefined","");
    console.dir(result);
    return JSON.parse(result) || null;
  } catch (err) {
    console.warn(err);
    return null;
  }
}


async function getImage(param) {
  let url;
  let b64;
  for await (const file of ipfs.cat(param, { cidVersion: 1 })) {
    let blob = new Blob([file], {type:"image/png"})
    url = URL.createObjectURL(blob)
    b64 = await blobToBase64(blob);
    
  }
  const r =  {url: url, base64: b64};
  console.dir(r);
  return r;
}



function GetAccount() {
    return account;
}


async function add(param) {
  if (param != null) {
    const encoder = new TextEncoder();
    const result = await fs.addBytes(encoder.encode(param), {
      cidVersion: 1,
      onProgress: (evt) => {
        console.info('add event', evt.type, evt.detail)
      }
    });
    console.dir(result);
    return await result.toString();
  }
    return null
}


async function addAll(params) {

  if (params != null) {
    let hash=[];
    const encoder = new TextEncoder()
    const fileToAdd = {
      path: `${params.name}`,
      content: encoder.encode(params)
    }
    let result = await fs.addFile(fileToAdd);
    if(Array.isArray(result)) result = result[0];
    console.dir(result.toString());
    hash.push(await result.toString());
    
    console.log(hash);
    return hash;
  }

  return null;
  
}


export default {initIPFS, add, GetAccount, getIPFS, getAddress, addAll, getJSON, getImage}


