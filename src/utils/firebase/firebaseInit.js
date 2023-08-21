import SDK from "weavedb-sdk";
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"

const contractTxId = "edJuxtr016r6TQDv1iwzCrKeeg6RDxKrMYFJ5BekOPw";
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
      console.log(err)
      await set("weavedb-identity", identity)
      return identity
    } else return storedIdentity
  } catch (e){
    console.log(e)
  }
  
}