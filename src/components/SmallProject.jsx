import React from "react";
import IconInfoCard from "./PaginaCard/IconInfoCard";
import PCDollarIcon from "../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../assets/img/pc-person-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { progettiState, progettiImageState} from "../recoilState";
import { getRecoil, setRecoil } from 'recoil-nexus';
import {useNavigate} from 'react-router-dom';

const SmallProject = (props) => {
  var progetto=getRecoil(progettiState).find(x => x.address === props.address);

  const percentage = 65;
  const navigate = useNavigate();

  function handleRedirect(e) {
    navigate(`/card/${props.address}`);
  }
  
  return (
    <div className="pmg-right-card">
      <div className="pmg-rc-left">
        <h3>{progetto.nomeAzienda}</h3>
        <p>
        {progetto.introduzione}
        </p>
      </div>

      <div className="pmg-rc-right">
        <div className="pc-hero-icon-grid">
          <IconInfoCard
            img={PCDollarIcon}
            text="324.211 su 200.00 Draccolti"
          />
          <IconInfoCard
            img={PCUserIcon}
            text="2304 persone hanno investito"
          />
          <IconInfoCard
            img={PCDollarIcon}
            text="21 giorni al termine"
          />
        </div>
        <div className="pc-70-box">
          <div className="graph-box">
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      strokeWidth={5}
                    />
                    ;
                  </div>
        </div>
      </div>
      <div className="pmg-btn-box">
      <button onClick={ handleRedirect  } className="grd-btn dopot-btn-lg">Scopri di più</button>
      </div>
    </div>
  );
};

export default SmallProject;
