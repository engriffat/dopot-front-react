import SDK from "weavedb-sdk";
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"

const contractTxId = "e8SnbuQCtHUTzsKPJcFLnngR_d1xq97IU6mSNpB3m8s";
export let db;

export async function init ()  {
  try{
    window.Buffer = Buffer
    db = new SDK({ contractTxId });
    await db.initializeWithoutWallet();
  } catch (e) { console.log(e)}
  
}

export async function getIdentity(){
  try{
    const storedIdentity = await get("weavedb-identity");
    if(!storedIdentity){
      let { tx, identity, err } = await db.createTempAddress()
      console.log(err)
      await set("weavedb-identity", identity)
      return identity
    } else return storedIdentity
  } catch (e){
    console.log(e)
  }
  
}