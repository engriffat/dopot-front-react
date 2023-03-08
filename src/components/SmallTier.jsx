import React from "react";
import BlogImg from "../assets/img/void.jpg";
import ProfileCardLeft from "./Profile/ProfileCardLeft";
import { progettiState, progettiImageState} from "../recoilState";
import { getRecoil, setRecoil } from 'recoil-nexus';



const SmallTier = (props) => {

  var progetto=getRecoil(progettiState).find(x => x.address === props.address);
  return (
    <ProfileCardLeft img={"data:image/jpg;base64," + progetto.logoAziendaListFiles["base64"]} price={progetto["prezzo"+props.tier]+"€"}>
    <h4> {progetto["nomeProdotto"+props.tier]}</h4>
      <p>
       {progetto["specTecnica"+props.tier]}
      </p>
      <br />
      <p>- Supply: {progetto["supply"+props.tier]}</p>

    </ProfileCardLeft>
  );
};

export default SmallTier;
