import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { MemoryBlockstore } from 'blockstore-core'
import { MemoryDatastore } from 'datastore-core'
import { IDBBlockstore } from 'blockstore-idb'
import { IDBDatastore } from 'datastore-idb'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { webRTCDirect, webRTC } from '@libp2p/webrtc'
import { webTransport } from '@libp2p/webtransport'
import { bootstrap } from '@libp2p/bootstrap'
import { kadDHT } from "@libp2p/kad-dht";
import { ipniContentRouting } from "@libp2p/ipni-content-routing";
import { ipns, ipnsValidator, ipnsSelector } from "@helia/ipns";
import * as dagPb from '@ipld/dag-pb'
import { dht } from "@helia/ipns/routing";
import { json } from '@helia/json'
import { blobToBase64 } from "./base64utils";
import { CID } from 'multiformats/cid'
import { mplex } from '@libp2p/mplex'
import all from 'it-all';
import { concat } from 'uint8arrays/concat'
import { useLayoutEffect } from 'react'
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
    const blockstore = new IDBBlockstore();
    await blockstore.open();
    const datastore = new IDBDatastore();
    await datastore.open();
    const dagPbWalker = {
      codec: dagPb.code,
      async * walk (block) {
        const node = dagPb.decode(block)
        yield * node.Links.map(l => l.Hash)
      }
    }
    const libp2p = await createLibp2p({
      datastore,
      transports: [ webTransport(), webRTCDirect(), webRTC(), webSockets() ],
      contentRouters: [ ipniContentRouting("https://cid.contact") ],
      connectionEncryption: [ noise() ],
      streamMuxers: [ yamux(), mplex() ],
      peerRouting: { // Peer routing configuration
        refreshManager: { // Refresh known and connected closest peers
          enabled: true, // Should find the closest peers.
          interval: 6e5, // Interval for getting the new for closest peers of 10min
          bootDelay: 10e3 // Delay for the initial query for closest peers
        }
      },
      peerDiscovery: [
        bootstrap({
          list: [
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp",
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
            "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
            "/dns4/elastic.dag.house/tcp/443/wss/p2p/bafzbeibhqavlasjc7dvbiopygwncnrtvjd2xmryk5laib7zyjor6kf3avm"
          ]
        })
      ],
      dagWalkers: [ dagPbWalker ],
      dht: kadDHT({
        validators: { ipns: ipnsValidator },
        selectors: {  ipns: ipnsSelector  },
      }),
      connectionGater: {
        filterMultiaddrForPeer: async (peer, multiaddr) => {
          const multiaddrString = multiaddr.toString();
          return !(multiaddrString.includes("/ip6/"));
        }
      }
    })
    
    ipfs = await createHelia({datastore, blockstore, libp2p});
    const heliaIPNS = ipns(ipfs, [dht(ipfs)]);
    fs = unixfs(ipfs);
}

async function getAddress() {
    return address;
}
function getIPFS() {
    return ipfs;
}

async function getJSON(param) {
  const cid = CID.parse(param);
  console.log(param);
  try {
    let data;
    const dataPromise = (async () => {
      const j = json(ipfs)
      data = await j.get(cid);
      return data;
    }
  )();
    const timeoutPromise = new Promise((resolve, reject) => {
      const time = .3 * 1000;
      setTimeout(() => {
        reject(new Error(`getJSON()\n${param}\n timed out after ${time}ms`));
      }, time);
    });
    let result = await Promise.race([dataPromise, timeoutPromise]);
    //result = result.replace("undefined","");
    //console.dir(result);
    return result || null;
  } catch (err) {
    console.warn(err);
    return null;
  }
}


async function getImage(param) {
  console.log(param);
  let url;
  let b64;
  try {
    let r;
    const dataPromise = (async () => {
      const decoder = new TextDecoder()
      let text = ''
      /*const cid = CID.parse(param);
      for await (const chunk of ipfs.cat(cid, {
        onProgress: (evt) => {
          console.info('cat event', evt.type, evt.detail)
        }
      })) {
        text += decoder.decode(chunk, {
          stream: true
        })
      }*/
      let blob = new Blob([param], {type:"image/png"})
      url = URL.createObjectURL(blob)
      b64 = await blobToBase64(blob);
      r =  {url: url, base64: b64};
      console.dir(r);
      return r;
    }
  )();
    const timeoutPromise = new Promise((resolve, reject) => {
      const time = .5 * 1000;
      setTimeout(() => {
        reject(new Error(`getImage()\n${param}\n timed out after ${time}ms`));
      }, time);
    });
    let result = await Promise.race([dataPromise, timeoutPromise]);
    //result = result.replace("undefined","");
    console.dir(result);
    return result || null;
  } catch (err) {
    console.warn(err);
    return null;
  }
}



function GetAccount() {
    return account;
}

// Add JSON
async function add(param) {
  if (param != null) {
    const j = json(ipfs);
    const result = await j.add(param);
    let r = result.toString();
    if(Array.isArray(r)) r = r[0];
    console.dir(r);
    return r;
  }
    return null
}

// Add image
async function addAll(params) {
  if (params != null) {
    const encoder = new TextEncoder()
    let result = await fs.addBytes(encoder.encode(params), {
      onProgress: (evt) => {
        console.info('add event', evt.type, evt.detail)
      }
    })
    if(Array.isArray(result)) result = result[0];
    let r = await result.toString();
    if(Array.isArray(r)) r = r[0];
    console.dir(r);
    return r;
  }

  return null;
  
}


export default {initIPFS, add, GetAccount, getIPFS, getAddress, addAll, getJSON, getImage}


