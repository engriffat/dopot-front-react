"use client"
import React, { useState, useEffect } from "react";
import IconInfoCard from "./IconInfoCard";
import IconInfoDai from "./IconInfoDai";
import { CircularProgressbar } from "react-circular-progressbar";
import Flag from "react-world-flags";
import { addFavorites } from "../../utils/firebase/writeInfos";
import { useTranslation } from "../../i18n/client";
import { useRouter } from "next/router"; // Import useRouter

const Card = (props) => {
  const { t } = useTranslation();
  const { progetto } = props;
  const percentage = (progetto.funds / progetto.quota) * 100;
  const fundRaisingDeadline = progetto.fundRaisingDeadline;
  const isMyProject = fundRaisingDeadline < 0;
  const address = progetto.address;
  const { progettiFavourites } = props;
  const [toggleHeart, setToggleHeart] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setToggleHeart(progettiFavourites && Array.isArray(progettiFavourites) ? progettiFavourites.includes(address) : false)
  }, [progettiFavourites, address]);
  function handleRedirect(e) {
    router.push(`/Card/${address}`);
    window.scrollTo(0, -1000000);
  }
  let desc = String(progetto.descProgetto);
  return (
    <div className="profile-box-dash">
      <div className="pmg-right-card" style={{backgroundImage: `url(https://arweave.net/${progetto.logoAziendaListFiles[0]})`}}>
        <div className="pmg-rc-left-card" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="settore">
              {/* <span className="box-bk-over-logo">{progetto.settore}</span> */}
            </div>
            <div style={{ marginBottom: "1rem" }} className="settore">
              <span className="box-bk-over-logo">
                {progetto.tipoCampagna}
              </span>
            </div>
          </div>
          <h3 className="box-bk-over-logo">{progetto.nomeAzienda}</h3>
          <h3 style={{ marginBottom: "2rem" }}>
            <span>
              <a
                className="link-social-new  box-bk-over-logo"
                href={progetto.sito}
                rel="noreferrer"
                target="_blank"
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
          <p className="read-more-target box-bk-over-logo">{desc}</p>

          {desc.length > 200 ? (
            <label
              for="post-{progetto.nomeAzienda}"
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
              text={`${progetto.investorsNumber} ${t("investors")}`}
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
                <img alt="Unfavourite" src={"/assets/img/heart-fav-active.svg"} />
              ) : (
                <img alt="Favourite" src={"/assets/img/heart-fav.svg"} />
              )}
            </button>
          
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
