"use client"
import React from "react";
import IconInfoCard from "./PaginaCard/IconInfoCard";
import IconInfoDai from "./PaginaCard/IconInfoDai";
import PCDollarIcon from "../../../public/assets/img/pc-dollar-icon.png";
import PCUserIcon from "../../../public/assets/img/pc-person-icon.png";
import PCCalendarIcon from "../../../public/assets/img/pc-calendar-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { progettiState } from "../recoilState";
import {RetriveProjectTypes} from "../utils/firebase/retriveInfo";
import { useRouter } from "next/router"; // Import useRouter

const SmallProject = (props) => {
  const router = useRouter(); // Initialize useRouter
  let progetto = getRecoil(progettiState).find(
    (x) => x.address === props.address
  );

  const percentage = (progetto.funds / progetto.quota) * 100;

  function handleRedirect(e) {
    router.push(`/Card/${props.address}`);
    window.scrollTo(0, -1000000);
  }

  return (
    <div className="pmg-right-card" style={{backgroundImage: `url(https://arweave.net/${progetto.logoAziendaListFiles[0]})`}}>
      <div className="pmg-rc-left">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="settore box-bk-over-logo">
            <span>{RetriveProjectTypes(progetto.settore)}</span>
          </div>
          <div className="settore box-bk-over-logo">
            <span>{progetto.tipoCampagna}</span>
          </div>
        </div>

        <h3 className="box-bk-over-logo">{progetto.nomeAzienda}</h3>
        <h3 style={{ marginBottom: "2rem" }}>
          <span>
            <a
              className="link-social-new box-bk-over-logo"
              href={progetto.sito}
              target="_blank"
              rel="noreferrer"
            >
              {progetto.sito}
            </a>
          </span>
        </h3>

        <input
          type="checkbox"
          className="read-more-state"
          id="post-{progetto.nomeAzienda}"
        />
        <p className="read-more-target box-bk-over-logo">{progetto.introduzione}</p>
        {progetto.introduzione.length > 200 ? (
          <label
            for="post-{progetto.nomeAzienda}"
            className="read-more-trigger"
          ></label>
        ) : null}
      </div>

      <div className="pmg-rc-right">
        <div className="pc-hero-icon-grid">
          <IconInfoDai img={PCDollarIcon} text="324.211 " text2="su 200.00" />
          <IconInfoCard img={PCUserIcon} text="2304 persone hanno investito" />
          <IconInfoCard img={PCCalendarIcon} text="21 giorni al termine" />
        </div>
        <div className="pc-70-box box-bk-over-logo">
          <div className="graph-box">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              strokeWidth={50}
            />
          </div>
        </div>
      </div>
      <div className="pmg-btn-box">
        <button onClick={handleRedirect} className="grd-btn dopot-btn-lg">
          Scopri di più
        </button>

        {/* <button
          onClick={() => addFavorites(progetto.address, t)}
          className="grd-btn-favorites"
        >
          <img src={IconHeart} alt="IconHeart" />
        </button> */}
      </div>
    </div>
  );
};

export default SmallProject;
