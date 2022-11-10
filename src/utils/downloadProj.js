import { getRecoil, setRecoil } from 'recoil-nexus';
import {  progettiAddressState , progettiState, providerState, IpfsState, progettiImageState } from "../recoilState";
import {GetAccount} from "./ethersUtils"


const abiProjectFactory = require('../abi/projectFactory/1.json');
const abiProject = require('../abi/project/1.json');
const { ethers, Contract } = require("ethers");

async function DownloadProj() {
    setRecoil(providerState, new ethers.providers.Web3Provider(window.ethereum));
    
    if ( getRecoil(IpfsState)==null) {
        await GetAccount();
    }    


    var progetti = await getAllProject();
    var progettiIpfs = [];
    try {
       for await(const element of progetti) {
        progettiIpfs.push(await getIPFSprojectAddr(element.projectAddress));
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
   
  const Address = "0xEe784386066cd3B340C6A97626B74b57009f7935";
  var contract = new Contract(Address, abiProjectFactory, getRecoil(providerState));
 
  var progetti=[];
  try {  
    var i = 0;
    while (true) {
      progetti.push( await contract.projectsVersions(i));
      i++;
    }
    } 
    catch (e) {    
      console.log(progetti);
        // handle exception  
    } 
    return progetti;

}

  async function getIPFSprojectAddr(Address) {
    const Contract = new ethers.Contract(Address, abiProject, getRecoil(providerState));
    var temp = await getRecoil(IpfsState).getJSON(await Contract.projectMedia());
    temp.address= Address;
    console.log(temp);
    setRecoil(progettiImageState, await getIPFSimage(temp));

    return temp;
  }

  async function getIPFSimage(element) {

    var ipfs =  getRecoil(IpfsState);
   
    var i = 1;
    var progettiImage =JSON.parse(JSON.stringify( getRecoil(progettiImageState)));
    progettiImage[element.address] = {};

    while (element["fotoProdotto"+i+"ipfs"] != null) { 
        progettiImage[element.address]["fotoProdotto"+i+"ipfs" ] = {}
        var n=0;
        for await (const elementipfs of  element["fotoProdotto"+i+"ipfs" ]) {
          progettiImage[element.address]["fotoProdotto"+i+"ipfs" ][n] = await ipfs.getImage(elementipfs.path); 
          n++;
        }
        
        
        i++;
    }

    if (element["logoAzienda"] != null ) {
      progettiImage[element.address]["logoAzienda" ] = await getRecoil(IpfsState).getImage(element["logoAzienda"][0].path ); 
    }
    return progettiImage;
    console.log(getRecoil(progettiImageState))
  }

export  {DownloadProj, getIPFSimage};