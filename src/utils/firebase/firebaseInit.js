import SDK from "weavedb-sdk";
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"

const contractTxId = "iziFADwddfp_0CURVCAyb4aPVl3yH6exDr8DhBTLTDo";
export let db;

export async function init ()  {
  try{
    window.Buffer = Buffer
    if(!db){
      db = new SDK({ contractTxId });
      await db.initializeWithoutWallet();
    }
  } catch (e) { console.log(e)}
  
}

export async function getIdentity(address){
  try{
    const storedIdentity = await get("weavedb-identity");
    if(!storedIdentity){
      let { tx, identity, err } = await db.createTempAddress()
      if(err) console.log(err)
      await set("weavedb-identity", identity)
      return identity
    } else return storedIdentity
  } catch (e){
    console.log(e)
  }
  
}