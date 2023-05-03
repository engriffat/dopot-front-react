import { getRecoil, setRecoil } from 'recoil-nexus';
import {  progettiAddressState , progettiState, providerState, IpfsState, progettiImageState } from "../recoilState";
import {GetAccount} from "./ethersUtils"
import addressProjectFactory from '../abi/projectFactory/address';


const abiProjectFactory = require('../abi/projectFactory/1.json');
const abiProject = require('../abi/project/1.json');
const { ethers, Contract } = require("ethers");

export async function downloadProj() {
    setRecoil(providerState, new ethers.providers.Web3Provider(window.ethereum));
    
    if ( getRecoil(IpfsState)==null) {
        await GetAccount();
    }    

    let progetti = await getAllProject();
    let progettiIpfs = [];
    try {
       for await(const element of progetti) {
        const r = await getIPFSprojectAddr(element.projectAddress);
        if(r !== null) progettiIpfs.push(r);
       }
    } catch (error) {
      console.log(error);
    }finally{
      setRecoil(progettiState, progettiIpfs);
      console.log(progettiIpfs);
      return true;
    }
}


async function getAllProject() {
   
  const Address = addressProjectFactory;
  let contract = new Contract(Address, abiProjectFactory, getRecoil(providerState));
 
  let progetti=[];
  try {
    const projectsLength = await contract.getProjectsLength();
    for (let i = 0; i < projectsLength.toNumber(); i++) {
      progetti.push( await contract.projectsVersions(i));
    }
  } 
  catch (e) {
    console.log(e); 
    console.log(progetti);
      // handle exception  
  } 
  return progetti;

}

  async function getIPFSprojectAddr(Address) {
    
    const Contract = new ethers.Contract(Address, abiProject, getRecoil(providerState));
    const projectMedia = await Contract.projectMedia();
    let temp = await getRecoil(IpfsState).getJSON(projectMedia);
    if(temp == null) return null;
    temp.address= Address;
    setRecoil(progettiImageState, await getIPFSimage(temp));
    return temp;
  }

  export async function getIPFSimage(element) {

    let ipfs =  getRecoil(IpfsState);
   
    let i = 1;
    let progettiImage =JSON.parse(JSON.stringify( getRecoil(progettiImageState)));
    progettiImage[element.address] = {};

    while (element["fotoProdotto"+i+"ipfs"] != null) { 
        progettiImage[element.address]["fotoProdotto"+i+"ipfs" ] = {}
        let n=0;
        for await (const elementipfs of element["fotoProdotto"+i+"ipfs" ]) {
          progettiImage[element.address]["fotoProdotto"+i+"ipfs" ][n] = await ipfs.getImage(elementipfs); 
          n++;
        }
        
        
        i++;
    }

    if (element["logoAzienda"] != null ) {
      progettiImage[element.address]["logoAzienda" ] = element["logoAzienda"]; 
    }
    console.dir(progettiImage);
    return progettiImage;
  }