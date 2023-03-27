import React from "react";

import IconInfoCard from "../../components/PaginaCard/IconInfoCard";
import PCDollarIcon from "../../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../../assets/img/pc-person-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const percentage = 65;

  function handleRedirect(e) {
    navigate(`/card/${props.progetto.address}`);
    window.scrollTo(0, -1000000);
  }

  return (
    <div className="profile-box-dash">
      <div className="pmg-right-card">
        <div className="pmg-rc-left">
          <h3>{props.progetto.nomeAzienda}</h3>
          <p>{props.progetto.descProgetto}</p>
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
            <IconInfoCard img={PCDollarIcon} text="21 giorni al termine" />
          </div>
          <div className="pc-70-box">
            <p>
              Investimento <br /> completo al
            </p>
            <div className="graph-box">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={5}
              />
            </div>
          </div>
        </div>
        <div className="pmg-btn-box">
          <button onClick={handleRedirect} className="grd-btn dopot-btn-lg">
            Scopri di più
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
