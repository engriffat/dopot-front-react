import SDK from "weavedb-sdk";
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"

const contractTxId = "5LKhkSdZ9tQ007IZDI9I4wUj-kaefi1q5GirH7zN010";
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