import { providerState } from "../recoilState";
import { getRecoil  } from 'recoil-nexus';
import addressProjectFactory from '../abi/projectFactory/address';
import { WebIrys } from "@irys/sdk";
const abiProjectFactory = require('../abi/projectFactory/1.json');
const abiProject = require('../abi/project/1.json');
const { ethers } = require("ethers");
export let webIrys;
const { Readable } = require('stream-browserify');

export const initialiseBundlr = async (provider) => {  
	const url = "https://arweave.mainnet.irys.xyz";
	const token = "arbitrum";
	const rpcURL = "https://arbitrum.llamarpc.com";
 	const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider };
  webIrys = new WebIrys({ network: "arbitrum", url, token, wallet });
	await webIrys.ready();
};

export async function genproj(params) {  
    return await contrattoprojectFactory(ethers.utils.parseUnits(params.quota.toString(), 18), Number(params.giorniCampagna) * 86400);
}

async function contrattoprojectFactory(quota, giorniCampagna){
  
    const Address = addressProjectFactory;
    const Contract = new ethers.Contract(Address, abiProjectFactory,getRecoil(providerState));
    const signer = getRecoil(providerState).getSigner();
    const pfWithSigner = Contract.connect(signer);
    // Each DAI has 18 decimal places
    //const dai = ethers.utils.parseUnits("1", 18);
    let tx = await pfWithSigner.createProject(quota, giorniCampagna);
    let receipt = await tx.wait(1);
    const event = receipt.events.find((event) => event.event === 'ProjectCreated');
    const projectaddr = event.args.project;
    //console.log(projectaddr);
    return projectaddr;
  }

  export async function bundlrFund(){
    const nodeBalance = webIrys.utils.fromAtomic(await webIrys.getLoadedBalance());
    if(nodeBalance < 0.0001) await webIrys.fund(10 ** 18 / 10000); // eth
  }

  export async function bundlrAdd(obj, contentType){ 
    try{
      const bundlrtx = await webIrys.upload(contentType.value === "application/json" ? JSON.stringify( obj ) : obj, [contentType]);
      console.log(`Data uploaded ==> https://arweave.net/${bundlrtx.id}`);
      return bundlrtx;
    }
    catch (e){
      console.log(e, contentType);
    }
  }

  export async function bundlrAddFile(obj, contentType){ 
    try{
      const bundlrtx = await webIrys.upload(contentType.value === "application/json" ? JSON.stringify( obj ) : obj, [contentType]);
      console.log(`Data uploaded ==> https://arweave.net/${bundlrtx.id}`);
      return bundlrtx;
    }
    catch (e){
      console.log(e, contentType);
    }
  }
  
  export async function contrattoProjectAddTier(inputs) {
    const provider = getRecoil(providerState);
    const Contract = new ethers.Contract(inputs.address, abiProject, provider);
    const signer = provider.getSigner()
    const pWithSigner = Contract.connect(signer);
    let objs = [];
    let i = 1;
    while (inputs["name"+i] != null) {
      const imgObj = inputs["imageNftDefListFiles"][i-1]
      const imageString = imgObj.base64;
      const base64Data = imageString.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      const nftimgtx = await bundlrAddFile(stream, { name: "Content-Type", value: "image/"+imgObj.fileExtension });
      const temp = {
        name: inputs["name"+i],
        description:  inputs["description"+i],
        image: "ar://" + nftimgtx.id,
        project: inputs.address,
        external_url: `https://dopot.fi/#/card/${inputs.address}`,
        specs: inputs["specs"+i],
        price: inputs["price"+i],
        supply: parseInt( inputs["supply"+i])
      };
      objs.push(Object.assign({}, temp));
      const bundlrtx = await bundlrAdd(objs[i-1], { name: "Content-Type", value: "application/json" });
      await pWithSigner.addRewardTier(bundlrtx.id,  ethers.utils.parseUnits(inputs["price"+i].toString(), 18), parseInt( inputs["supply"+i]))
      objs[objs.length-1].uri = bundlrtx.id;
      delete objs[objs.length-1].external_url;
      delete objs[objs.length-1].project;
      i++;
    }
    return objs;
  }


export default genproj