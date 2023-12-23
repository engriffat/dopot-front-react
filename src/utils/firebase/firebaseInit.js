import WeaveDB from "weavedb-sdk"
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contractTxId = "H0n_EZSofNcZNdKj6ylwIwwy8qRZSF3lnWKEhLYDI2E";
export let db;

export async function init ()  {
  try{
    window.Buffer = Buffer
    if(!db){
      db = new WeaveDB({ contractTxId })
      await db.init()
    }
  } catch (e) { console.log(e)}
  
}

export async function getIdentity(t){
  try{
    const storedIdentity = await get("weavedb-identity");
    if(!storedIdentity){
      toast.info(t("sign"));
      let { tx, identity, err } = await db.createTempAddress()
      if(err) console.log(err)
      await set("weavedb-identity", identity)
      return identity
    } else return storedIdentity
  } catch (e){
    console.log(e)
  }
  
}