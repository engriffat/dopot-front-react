import { providerState } from "../recoilState";
import { getRecoil  } from 'recoil-nexus';
import addressProjectFactory from '../abi/projectFactory/address';
import { WebBundlr } from "@bundlr-network/client";
const abiProjectFactory = require('../abi/projectFactory/1.json');
const abiProject = require('../abi/project/1.json');
const { ethers } = require("ethers");
export let bundlr;

export const initialiseBundlr = async (provider) => { 
  bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", provider); //"https://node2.bundlr.network"
  await bundlr.ready();
};

export async function genproj(params) {  
    return await contrattoprojectFactory(params.quota, Number(params.giorniCampagna) * 86400);
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
    const nodeBalance = bundlr.utils.fromAtomic(await bundlr.getLoadedBalance());
    if(nodeBalance < 0.05)
      await bundlr.fund(10 ** 18/2/10); //0.05 matic
  }

  export async function bundlrAdd(obj, contentType){ 
    try{
      const bundlrtx = await bundlr.upload(contentType.value === "application/json" ? JSON.stringify( obj ) : obj, [contentType]);
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
      const nftimgtx = await bundlrAdd(inputs["imageNftDefListFiles"][i-1], { name: "Content-Type", value: "image/png" });
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