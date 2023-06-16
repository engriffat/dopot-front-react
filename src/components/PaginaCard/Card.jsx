import React from "react";

import IconInfoCard from "../../components/PaginaCard/IconInfoCard";
import IconInfoDai from "../../components/PaginaCard/IconInfoDai";
import PCDollarIcon from "../../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../../assets/img/pc-person-icon.png";
import PCCalendarIcon from "../../assets/img/pc-calendar-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const percentage = props.progetto.funds / props.progetto.quota * 100

  function handleRedirect(e) {
    navigate(`/card/${props.progetto.address}`);
    window.scrollTo(0, -1000000);
  }
  let desc = String(props.progetto.descProgetto);
  return (
    <div className="profile-box-dash">
      <div className="pmg-right-card">
        <div className="pmg-rc-left-card" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="settore">
              <span className="box-bk-over-logo">{props.progetto.settore}</span>
            </div>
            <div style={{ marginBottom: "1rem" }} className="settore">
              <span className="box-bk-over-logo">
                {props.progetto.tipoCampagna}
              </span>
            </div>
          </div>
          <h3 className="box-bk-over-logo">{props.progetto.nomeAzienda}</h3>
          <h3 style={{ marginBottom: "2rem" }}>
            <span>
              <a
                className="link-social-new  box-bk-over-logo"
                href={props.progetto.sito}
                target="_blank"
              >
                {props.progetto.sito}
              </a>
            </span>
          </h3>

          <input
            type="checkbox"
            class="read-more-state"
            id="post-{props.progetto.nomeAzienda}"
          />
          <p class="read-more-target box-bk-over-logo">{desc}</p>

          {desc.length > 200 ? (
            <label
              for="post-{props.progetto.nomeAzienda}"
              class="read-more-trigger"
            ></label>
          ) : null}
        </div>

        <div className="pmg-rc-right">
          <div className="pc-hero-icon-grid">
            <IconInfoDai img={PCDollarIcon} text={props.progetto.funds} text2={`of ${props.progetto.quota}`} />
            <IconInfoCard
              img={PCUserIcon}
              text={`${props.progetto.investorsNumber} investors`}
            />
            <IconInfoCard img={PCDollarIcon} text={`${props.progetto.fundRaisingDeadline} days remaining`} />
          </div>
          <div className="pc-70-box box-bk-over-logo">
            <p>
              Investimento <br /> completo al
            </p>
            <div className="graph-box">
              <CircularProgressbar
                value={percentage}
                text={`${Math.round(percentage)}%`}
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
