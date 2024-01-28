import WeaveDB from "weavedb-sdk"
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contractTxId = "87UyXJ4X-nyR7RvQkcuNIkdr2z5tAxP4iYwFh-BpKe0";
export let db;

export async function init ()  {
  try{
    window.Buffer = Buffer
    if(!db){
      db = new WeaveDB({ contractTxId, remoteStateSyncSource: "https://dre-6.warp.cc/contract", type: 2 });
      await db.init();
    }
  } catch (e) { console.log(e)}
  
}

export async function getIdentity(t){
  try{
    const storedIdentity = await get("weavedb-identity");
    if(!storedIdentity){
      toast.info(t("sign"));
      let { identity } = await db.createTempAddress();
      await set("weavedb-identity", identity);
      return identity;
    } else return storedIdentity;
  } catch (e){
    console.log(e)
  }
  
}