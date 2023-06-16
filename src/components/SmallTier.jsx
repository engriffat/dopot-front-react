import React from "react";
import BlogImg from "../assets/img/void.jpg";
import ProfileCardLeft from "./Profile/ProfileCardLeft";
import { progettiState, progettiImageState} from "../recoilState";
import { getRecoil, setRecoil } from 'recoil-nexus';



const SmallTier = (props) => {

  var progetto=getRecoil(progettiState).find(x => x.address === props.address);
  console.dir(props.tier)
  return (
    <ProfileCardLeft img={"https://arweave.net/"+progetto.logoAziendaListFiles[0]} price={"DAI " + progetto["price"+props.tier]}>
    <h4> {progetto["name"+props.tier]}</h4>
      <p>
       {progetto["specs"+props.tier]}
      </p>
      <br />
      <p>{progetto.imageNftDefListFiles[props.tier-1]["currentSupply"]}/{progetto["supply" + props.tier]} supply</p>

    </ProfileCardLeft>
  );
};

export default SmallTier;
