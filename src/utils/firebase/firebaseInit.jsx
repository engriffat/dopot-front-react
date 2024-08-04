"use client"
import WeaveDB from "weavedb-sdk"
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"
import { toast } from "react-toastify";
import addressDpt from '../../abi/dpt/address.js';
import { PushAPI } from '@pushprotocol/restapi';
import { getRecoil  } from 'recoil-nexus';
import { providerState } from "../../recoilState";

const contractTxId = "NkYdataKkg9KYtjbopSyjqeFTfBGEa6h66zHSdB33W8";
export let db;

async function addDptToken() {
  const tokenSymbol = 'DPT';
  const tokenDecimals = 18;
  const tokenImage = 'ipfs://QmQTcCgeYoN5wZFjngaMq22QxYEdL5rWZYtZmskG766WCg/dpttokenlogo.png';
  try {
    if (typeof window !== "undefined") {
      await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
          type: 'ERC20',
          options: {
              address: addressDpt,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
          },
          },
      });
    }
  } catch (error) {
  console.log(error);
  }
}

export async function init ()  {
  try{
    if (typeof window !== "undefined") window.Buffer = Buffer
    if(!db){
      db = new WeaveDB({ contractTxId, nocache: true, remoteStateSyncEnabled: true, remoteStateSyncSource: "https://dre-1.warp.cc/contract" });
      await db.init();
    }

    const signer = await getRecoil(providerState).getSigner();
    if(!(await get("pushUser"))){
      const pushUser = await PushAPI.initialize(signer, { env: 'prod' });
      await set("pushUser", true);
      console.dir(pushUser)
    }

    return db;
  } catch (e) { console.log(e)}
  
}

export async function getPushUser(){
  const signer = await getRecoil(providerState).getSigner();
  const address = await signer.getAddress();
  if(!PushAPI.user){
    const pushUser = await PushAPI.initialize(signer, { env: 'prod' });
    await set("pushUser", true);
    return pushUser;
  }
  return await PushAPI.user.get({ account: 'eip155:'+address, env: 'prod' });
}

export async function getIdentity(t){
  try{
    const storedIdentity = await get("weavedb-identity");
    if(!storedIdentity){
      toast.info(t("sign"));
      let { identity } = await db.createTempAddress();
      await set("weavedb-identity", identity);
      await addDptToken();
      return identity;
    } else return storedIdentity;
  } catch (e){
    console.log(e)
  }
  
}