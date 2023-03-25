import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState , progettiState} from '../../recoilState';
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";
import { db } from './firebaseInit';

const { ethers } = require("ethers");
const { ethereum } = window;

export async function getAddr(setState) {
    var provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    var account = provider.getSigner();
    var address=await account.getAddress();
    setRecoil(addressState, address)
    setState(address.toString().substring(0, 7) + "...")
}

export async function downloadProj() {
    const q = query(collection(db, "progetti"));
    const querySnapshot = await getDocs(q);
  
    const progetti = []
    querySnapshot.forEach((doc) => {
        progetti.push({...doc.data()})
    });

    setRecoil(progettiState, progetti)

    return true
}

export async function retriveInvestment() {
    var addressLogged=getRecoil(addressState)
    console.log(addressLogged)
    const q = query(collection(db, "investment"), where("addressUser", "==", addressLogged.toString()));
    const querySnapshot = await getDocs(q);
    
    const progettiInvested = []
    querySnapshot.forEach((doc) => {
        progettiInvested.push({...doc.data()})
    });

    return progettiInvested
}


export async function retriveFavorites() {
    var addressLogged=getRecoil(addressState)
    console.log(addressLogged)
    
    const q = query(collection(db, "favorites"), where("addressUser", "==", addressLogged.toString()));
    const querySnapshot = await getDocs(q);
    
    const progettiFavourites = []
    querySnapshot.forEach((doc) => {
        progettiFavourites.push({...doc.data()})
    });

    return progettiFavourites
}
