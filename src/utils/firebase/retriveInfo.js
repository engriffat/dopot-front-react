import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState } from '../../recoilState';

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