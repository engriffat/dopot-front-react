import { IpfsState, progettiAddressState , providerState, progettiState} from "../recoilState";
import { getRecoil, setRecoil } from 'recoil-nexus';
import {GetAccount} from "./ethersUtils"
import addressProjectFactory from '../abi/projectFactory/address';
import { fileToBase64 } from "./base64utils";
const abiProjectFactory = require('../abi/projectFactory/1.json');
const abiProject = require('../abi/project/1.json');
const { ethers, Contract } = require("ethers");

async function readFile(file){
  if (!file) return;

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
    params.logoAziendaipfs=fileToBase64(params.logoAziendaListFiles);
    params.documentazioneipfs=fileToBase64(params.documentazioneListFiles);
    params.fotoIntroipfs=fileToBase64(params.fotoIntroListFiles);
    params.fotoVisionipfs=fileToBase64(params.fotoVisionListFiles);
    params.fotoStoriaipfs=fileToBase64(params.fotoStoriaListFiles);
    params["fotoProdotto1ipfs"]=(await addFilesIpfs(params["fotoProdotto1ListFiles"]))[0];
    params["fotoProdotto2ListFiles"] && (params["fotoProdotto2ipfs"]=(await addFilesIpfs(params["fotoProdotto2ListFiles"]))[0]);
    params["fotoProdotto3ListFiles"] && (params["fotoProdotto3ipfs"]=(await addFilesIpfs(params["fotoProdotto3ListFiles"]))[0]);
    params["fotoProdotto4ListFiles"] && (params["fotoProdotto4ipfs"]=(await addFilesIpfs(params["fotoProdotto4ListFiles"]))[0]);

    let i = 1;
    let Tier = [];   
    let TierCompleto = [];   
    while (params["nomeProdotto"+i] != null) {
        
        console.log(i)
        Tier.push({ipfshash:params["fotoProdotto"+i+"ipfs"][0],
        investment: ethers.utils.parseUnits(params["prezzo"+i].toString(), 18),
        supply:parseInt( params["supply"+i]) });
        
        TierCompleto.push({ipfshash:params["fotoProdotto"+i+"ipfs"],
        nomeProdotto: params["nomeProdotto"+i],
        descProdotto: params["descProdotto"+i],
        specTecnica: params["specTecnica"+i],
        prezzo: params["prezzo"+i],
        supply:parseInt( params["supply"+i]) });
        i++;
    }

    let progetto=params;
    delete progetto.fotoProdotto1;
    delete progetto.fotoProdotto1ListFiles;
    delete progetto.fotoProdotto2;
    delete progetto.fotoProdotto2ListFiles;
    delete progetto.fotoProdotto3;
    delete progetto.fotoProdotto3ListFiles;
    delete progetto.fotoProdotto4;
    delete progetto.fotoProdotto4ListFiles;

    delete progetto.fotoProdotto1ipfs;
    delete progetto.fotoProdotto2ipfs;
    delete progetto.fotoProdotto3ipfs;
    delete progetto.fotoProdotto4ipfs;

    delete progetto.nomeProdotto1;
    delete progetto.nomeProdotto2;
    delete progetto.nomeProdotto3;
    delete progetto.nomeProdotto4;

    delete progetto.descProdotto1;
    delete progetto.descProdotto2;
    delete progetto.descProdotto3;
    delete progetto.descProdotto4;

    delete progetto.specTecnica1;
    delete progetto.specTecnica2;
    delete progetto.specTecnica3;
    delete progetto.specTecnica4;

    delete progetto.supply1;
    delete progetto.supply2;
    delete progetto.supply3;
    delete progetto.supply4;

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

    delete progetto.prezzo1;
    delete progetto.prezzo2;
    delete progetto.prezzo3;
    delete progetto.prezzo4;

    progetto.tier = TierCompleto;
    console.log(progetto);
    console.dir("FINAL");
    console.dir(params);
    const hash= await IPFS.add( JSON.stringify(params) );

    //getAllProject();
    //getIPFSprojectAddr(getRecoil(progettiAddressState)[0][0]);
    contrattoprojectFactory(45 * 86400, hash, Tier);
}

async function addFilesIpfs(files) {
    const IPFS = getRecoil(IpfsState);
    //console.log(await IPFS.getAddress());
    console.log(files);

    return await IPFS.addAll(await readFile(files), {cidVersion: 1});
}

async function contrattoprojectFactory(fundRaisingDeadline, infoIpfs, Tier){
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
  
    let tx = await daiWithSigner.createProject(fundRaisingDeadline, infoIpfs);
  
    let receipt = await tx.wait(1);
    let projectCreatedEvent = receipt.events.pop();
    let projectaddr =  ethers.utils.defaultAbiCoder.decode(['address'], projectCreatedEvent.topics[3])[0]  ;

    console.log(projectaddr);
    console.log(Tier);
    for (const key in Tier) {
        contrattoProjectAddTier(projectaddr, getRecoil(providerState), Tier[0]);
    }
    

  }


  async function getIPFSprojectAddr(Address) {
    
    const Contract = new ethers.Contract(Address, abiProject, getRecoil(providerState));
    setRecoil(progettiState, await getRecoil(IpfsState).getJSON(await Contract.projectMedia()));
    var img =await getRecoil(IpfsState).getImage(getRecoil(progettiState).fotoProdotto1ipfs[0].path);
    setRecoil(progettiState, {...getRecoil(progettiState)[0], fotoProdotto1: img} )
    console.log()
    
  }

  
  async function contrattoProjectAddTier(Address,provider,tier) {
    const Contract = new ethers.Contract(Address, abiProject, provider);
  
    const signer = provider.getSigner()
    const daiWithSigner = Contract.connect(signer);
    
    let tx = await daiWithSigner.addRewardTier(tier.ipfshash, tier.investment, tier.supply);
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