"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import IconInfoCard from "../../components/PaginaCard/IconInfoCard";
import IconInfoDai from "../../components/PaginaCard/IconInfoDai";
import { CircularProgressbar } from "react-circular-progressbar";
import Flag from "react-world-flags";
import { addFavorites, postpone } from "../../utils/firebase/writeInfos";
import { useTranslation } from "../../i18n/client";
import { getWithdrawalFees, getPWithSigner } from "../../utils/firebase/writeInfos";
const { ethers } = require("ethers");
import { useRouter } from "next/router"; // Import useRouter

const Card = (props) => {
  const { t } = useTranslation();
  const { progetto, loadFees } = props;
  const percentage = (progetto.funds / progetto.quota) * 100;
  const fundRaisingDeadline = progetto.fundRaisingDeadline;
  const isMyProject = props.isMyProject;
  const { address } = progetto;
  const { progettiFavourites } = props;
  const [toggleHeart, setToggleHeart] = useState(false);
  const router = useRouter(); // Initialize useRouter

  //if(progetto?.funds == 0 && )
  useEffect(() => {
    setToggleHeart(
      progettiFavourites && Array.isArray(progettiFavourites)
        ? progettiFavourites.includes(props.address)
        : false
    );
  }, [progettiFavourites]);

  const [fees, setFees] = useState(null);
  useEffect(() => {
    // Define an async function to retrieve the value
    const fetchFees = async () => {
      try {
        const result = await getWithdrawalFees(await getPWithSigner(address));
        setFees(ethers.utils.formatUnits(result.toString(), 18)); 
      } catch (error) {
        console.error('Error fetching fees:', error);
        setFees(0);
      }
    };
    if(loadFees) fetchFees();
  }, []); 

  function handleRedirect(e) {
    router.push(`/Card/${address}`);
    window.scrollTo(0, -1000000);
  }
  let desc = String(progetto.descProgetto);
  return (
    <div className="profile-box-dash">
      <div
        className="pmg-right-card"
        style={{
          backgroundImage: `url(https://arweave.net/${progetto.logoAziendaListFiles[0]})`,
        }}
      >
        <div className="pmg-rc-left-card" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
          {progetto.totalStaked !== "0" && (
          <div style={{ marginBottom: "1rem" }} className="settore">
              <span className="box-bk-over-logo">{progetto.totalStaked} DPT staked</span>
          </div>
          )}
            <div className="settore">
              {/* <span className="box-bk-over-logo">{props.progetto.settore}</span> */}
            </div>
            <div style={{ marginBottom: "1rem" }} className="settore">
              <span className="box-bk-over-logo">{progetto.tipoCampagna}</span>
            </div>
          </div>
          <h3 className="box-bk-over-logo">{progetto.nomeAzienda}</h3>
          <h3 style={{ marginBottom: "2rem" }}>
            <span>
              <a
                className="link-social-new  box-bk-over-logo"
                href={props.progetto.sito}
                target="_blank"
              >
                {progetto.sito}
              </a>
            </span>
          </h3>

          <input
            type="checkbox"
            className="read-more-state"
            id="post-{props.progetto.nomeAzienda}"
          />
          <p className="read-more-target box-bk-over-logo">{desc}</p>

          {desc.length > 200 ? (
            <label
              for="post-{props.progetto.nomeAzienda}"
              className="read-more-trigger"
            ></label>
          ) : null}
        </div>

        <div className="pmg-rc-right">
          <div className="pc-hero-icon-grid">
            <IconInfoDai
              img={"/assets/img/pc-dollar-icon.png"}
              text={progetto.funds}
              text2={`${t("of")} ${progetto.quota}`}
            />
            <IconInfoCard
              img={"/assets/img/pc-person-icon.png"}
              text={`${progetto.investorsNumber || 0} ${t("investors")}`}
            />
            {
              <IconInfoCard
                img={"/assets/img/pc-calendar-icon.png"}
                text={
                  isMyProject
                    ? progetto.stateText
                    : `${fundRaisingDeadline} ${t("daysremaining")}`
                }
              />
            }
          </div>
          <div className="pc-70-box box-bk-over-logo">
            <p>
              {t("investmentcard")} <br /> {t("completedat")}
            </p>
            <div className="graph-box">
              <CircularProgressbar
                value={percentage}
                text={`${Math.round(percentage)}%`}
                strokeWidth={15}
              />
            </div>
          </div>
        </div>
        
        <div className="pmg-btn-box">
          {isMyProject ? (
            <div className="menu-nav">
              <div className="dropdown-container d-flex " tabindex="-1">
                <div className="three-dots box-bk-over-logo"></div>
                <div className="dropdown">
                  <a onClick={() => props.withdraw(address)}>
                    <div>{t("withdrawfunds")} {fees} DPT)</div>
                  </a>
                  <a onClick={() => postpone(address)}>
                    <div>{t("postponedeadline")}</div>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                addFavorites(address, t);
                toggleHeart
                  ? progettiFavourites.splice(
                      progettiFavourites.indexOf(address),
                      1
                    )
                  : progettiFavourites.push(address);
                setToggleHeart(!toggleHeart);
              }}
              // className="grd-btn dopot-btn-lg"
              style={{ background: "none", width: "10%" }}
            >
              {toggleHeart ? (
                <img src={"/assets/img/heart-fav-active.svg"} />
              ) : (
                <img src={"/assets/img/heart-fav.svg"} />
              )}
            </button>
          )}
          
          <button onClick={handleRedirect} className="grd-btn dopot-btn-lg">
            {t("findoutmore")}
          </button>
          <div style={{ bottom: 0, right: 0 }}>
            <Flag code={progetto.nazioneAzienda} height="16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
