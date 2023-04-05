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
  let desc = String(props.progetto.descProgetto);
  return (
    <div className="profile-box-dash">
      <div className="pmg-right-card">
        <div className="pmg-rc-left-card">
          <h3>{props.progetto.nomeAzienda}</h3>

          <input
            type="checkbox"
            class="read-more-state"
            id="post-{props.progetto.nomeAzienda}"
          />
          <p class="read-more-target">{desc}</p>

          {desc.length > 200 ? (
            <label
              for="post-{props.progetto.nomeAzienda}"
              class="read-more-trigger"
            ></label>
          ) : null}
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
