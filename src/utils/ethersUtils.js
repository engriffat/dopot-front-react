import IPFS from "./ipfsUtils";
import { IpfsState } from "../recoilState";
import { setRecoil } from 'recoil-nexus';





export const GetAccount = async (setState) => {
    

    await IPFS.initIPFS();
    setRecoil(IpfsState, IPFS);

    if (setState != null) {
      setState(await (await IPFS.getAddress()).toString().substring(0, 7) + "...");
    }

  }

  async function persistentStorage() {
    if (navigator.storage && navigator.storage.persist) {
      var isPersisted = await navigator.storage.persist();
      console.log(`Persisted storage granted: ${isPersisted}`);
      if(!isPersisted){
        await Notification.requestPermission()
        isPersisted = await navigator.storage.persist()
        console.log(`Persisted storage granted: ${isPersisted}`);
      }
    }
  }

  async function userdb(account, db) {

    // Add an entry
    const hash = await db.add("id",account.getAddress());
    //console.log(hash)
    // Query
    const result = db.iterator({ limit: -1 }).collect()
    //console.log(JSON.stringify(result, null, 2))
  }

  function rndString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export default GetAccount;


