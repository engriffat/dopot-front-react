import { IpfsState, progettiAddressState , providerState, progettiState} from "../recoilState";
import { getRecoil, setRecoil } from 'recoil-nexus';
import addressProjectFactory from '../abi/projectFactory/address';
import { fileToBase64, filelistToBase64 } from "./base64utils";
import { WebBundlr } from "@bundlr-network/client";
const abiProjectFactory = require('../abi/projectFactory/1.json');
const abiProject = require('../abi/project/1.json');
const { ethers, Contract } = require("ethers");
let bundlr;

const initialiseBundlr = async (provider) => { 
  bundlr = new WebBundlr("https://node2.bundlr.network", "matic", provider);
  await bundlr.ready();
};

async function readFile(file){
  if (!file) return file;

  if(file instanceof FileList) file = file[0];
  const reader = new FileReader();
  let fileContent;

  await new Promise((resolve, reject) => {
    reader.onload = function(event) {
      fileContent = event.target.result;
      resolve();
    };
    reader.readAsText(file);
  });

  return fileContent;
}

export async function genproj(params) {  
    return await contrattoprojectFactory(params.quota, params.giorniCampagna * 86400);
}

async function addFilesIpfs(files) {
    const IPFS = getRecoil(IpfsState);
    //console.log(await IPFS.getAddress());
    console.log(files);

    return await IPFS.addAll(await readFile(files));
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

  async function getIPFSprojectAddr(Address) {
    
    const Contract = new ethers.Contract(Address, abiProject, getRecoil(providerState));
    setRecoil(progettiState, await getRecoil(IpfsState).getJSON(await Contract.projectMedia()));
    var img =await getRecoil(IpfsState).getImage(getRecoil(progettiState).fotoProdotto1ipfs[0]);
    setRecoil(progettiState, {...getRecoil(progettiState)[0], fotoProdotto1: img} )
    console.log()
    
  }

  export async function bundlrAdd(obj, contentType){ 
    !bundlr && await initialiseBundlr(getRecoil(providerState));
    const bundlrtx = await bundlr.upload(contentType.value === "application/json" ? JSON.stringify( obj ) : obj, [contentType]);
    console.log(`Data uploaded ==> https://arweave.net/${bundlrtx.id}`);
    return bundlrtx;
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
      i++;
    }
    const accounts = await provider.listAccounts();
    const keyB64 = await provider.send('eth_getEncryptionPublicKey', [accounts[0]]);
    await pWithSigner.setPublicEncryptionKey(Buffer.from(keyB64, 'base64'));
    return objs;
  }

  /** Uses `URL.createObjectURL` free returned ObjectURL with `URL.RevokeObjectURL` when done with it.
   * 
   * @param {string} cid CID you want to retrieve
   * @param {string} mime mimetype of image (optional, but useful)
   * @param {number} limit size limit of image in bytes
   * @returns ObjectURL
   */
  async function loadImgURL(cid, mime, limit) {
    const IPFS = getRecoil(IpfsState);

    if (cid == "" || cid == null || cid == undefined) {
        return;
    }
    for await (const file of IPFS.getIPFS().get(cid)) {
        if (file.size > limit) {
            return;
        }
        const content = [];
        if (file.content) {
            for await(const chunk of file.content) {
                content.push(chunk);
            }
            return URL.createObjectURL(new Blob(content, {type: mime}));
        }
    }
  }


export default genproj