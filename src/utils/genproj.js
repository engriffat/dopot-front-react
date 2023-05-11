import { IpfsState, progettiAddressState , providerState, progettiState} from "../recoilState";
import { getRecoil, setRecoil } from 'recoil-nexus';
import {GetAccount} from "./ethersUtils"
import addressProjectFactory from '../abi/projectFactory/address';
import { fileToBase64, filelistToBase64 } from "./base64utils";
const abiProjectFactory = require('../abi/projectFactory/1.json');
const abiProject = require('../abi/project/1.json');
const { ethers, Contract } = require("ethers");

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

    let IPFS = getRecoil(IpfsState); 
    setRecoil(providerState, new ethers.providers.Web3Provider(window.ethereum));
    
    if (IPFS==null) {
        await GetAccount(null);
        IPFS = getRecoil(IpfsState); 
    }
    console.log(params);

    // Carico prima i file ipfs
    params.logoAziendaipfs=await fileToBase64(params.logoAziendaListFiles[0]);
    params.documentazioneipfs=await filelistToBase64(params.documentazioneListFiles);
    params.fotoIntroipfs=await filelistToBase64(params.fotoIntroListFiles);
    params.fotoVisionipfs=await filelistToBase64(params.fotoVisionListFiles);
    params.fotoStoriaipfs=await filelistToBase64(params.fotoStoriaListFiles);
    params["fotoProdotto1ipfs"]=(await filelistToBase64(params["fotoProdotto1ListFiles"]));
    params["fotoProdotto2ipfs"] && (params["fotoProdotto2ipfs"]=await filelistToBase64(params["fotoProdotto2ListFiles"]));
    params["fotoProdotto3ipfs"] && (params["fotoProdotto3ipfs"]=await filelistToBase64(params["fotoProdotto3ListFiles"]));
    params["fotoProdotto4ipfs"] && (params["fotoProdotto4ipfs"]=await filelistToBase64(params["fotoProdotto4ListFiles"]));

    let i = 1;
    let Tier = [];   
    while (params["name"+i] != null) {
        
        const metadata = await IPFS.add( {
          name: params["name"+i],
          description:  params["description"+i],
          image: params["fotoProdotto"+i+"ipfs"],
          external_url: "https://app.dopot.fi/r/{id}",
          specs: params["specs"+i],
          price: params["price"+i],
          supply: parseInt( params["supply"+i])
        } );
        Tier.push({
          metadata,
          investment: ethers.utils.parseUnits(params["price"+i].toString(), 18),
          supply: parseInt( params["supply"+i])
        });
        i++;
    }

    let progetto=params;
   
    const regex = /^name\d+$|^description\d+$|^specs\d+$|^supply\d+$|^price\d+$|^fotoProdotto\d+$|^fotoProdotto\d+ListFiles$|^fotoProdotto\d+Ipfs$/;
    Object.keys(progetto).forEach(key => {
      if (regex.test(key)) {
        delete progetto[key];
      }
    });

    delete progetto.fotoIntro;
    delete progetto.fotoIntroListFiles;
    delete progetto.fotoStoria;
    delete progetto.fotoStoriaListFiles;
    delete progetto.fotoVision;
    delete progetto.fotoVisionListFiles;
    delete progetto.documentazione;
    delete progetto.documentazioneListFiles;
    delete progetto.logoAzienda;
    delete progetto.logoAziendaListFiles;

    progetto.tier = Tier;
    const hash= await IPFS.add( params );

    //getAllProject();
    //getIPFSprojectAddr(getRecoil(progettiAddressState)[0][0]);
    contrattoprojectFactory(params.quota, 45 * 86400, hash, Tier);
}

async function addFilesIpfs(files) {
    const IPFS = getRecoil(IpfsState);
    //console.log(await IPFS.getAddress());
    console.log(files);

    return await IPFS.addAll(await readFile(files));
}

async function contrattoprojectFactory(quota, fundRaisingDeadline, infoIpfs, Tier){
    console.log(Tier)
    for (const key in Tier) {
       console.log(Tier[0]);
    }

    //console.log(fundRaisingDeadline);
    console.log(infoIpfs);
  
    const Address = addressProjectFactory;
  
    const Contract = new ethers.Contract(Address, abiProjectFactory,getRecoil(providerState));
  
    const signer = getRecoil(providerState).getSigner();
    const daiWithSigner = Contract.connect(signer);
  
    // Each DAI has 18 decimal places
    //const dai = ethers.utils.parseUnits("1", 18);
  
    let tx = await daiWithSigner.createProject(quota, fundRaisingDeadline, infoIpfs);
  
    let receipt = await tx.wait(1);
    let projectCreatedEvent = receipt.events.pop();
    let projectaddr =  ethers.utils.defaultAbiCoder.decode(['address'], projectCreatedEvent.topics[3])[0];

    console.log(projectaddr);
    console.log(Tier);
    for (const key in Tier) {
        contrattoProjectAddTier(projectaddr, getRecoil(providerState), Tier[0]);
    }
  }

  async function getIPFSprojectAddr(Address) {
    
    const Contract = new ethers.Contract(Address, abiProject, getRecoil(providerState));
    setRecoil(progettiState, await getRecoil(IpfsState).getJSON(await Contract.projectMedia()));
    var img =await getRecoil(IpfsState).getImage(getRecoil(progettiState).fotoProdotto1ipfs[0]);
    setRecoil(progettiState, {...getRecoil(progettiState)[0], fotoProdotto1: img} )
    console.log()
    
  }

  
  async function contrattoProjectAddTier(Address,provider,tier) {
    const Contract = new ethers.Contract(Address, abiProject, provider);
  
    const signer = provider.getSigner()
    const daiWithSigner = Contract.connect(signer);
    
    let tx = await daiWithSigner.addRewardTier(tier.metadata, tier.investment, tier.supply);
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