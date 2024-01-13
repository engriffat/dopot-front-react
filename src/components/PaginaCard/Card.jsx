import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import IconInfoCard from "../../components/PaginaCard/IconInfoCard";
import IconInfoDai from "../../components/PaginaCard/IconInfoDai";
import PCDollarIcon from "../../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../../assets/img/pc-person-icon.png";
import PCCalendarIcon from "../../assets/img/pc-calendar-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { addFavorites, postpone } from "../../utils/firebase/writeInfos";
// import IconHeart from "../../assets/img/pc-heart-icon-02.svg";
import IconHeart from "../../assets/img/heart-fav.svg";
import IconHeartActive from "../../assets/img/heart-fav-active.svg";
import { useTranslation } from "react-i18next";

const Card = (props) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { progetto } = props;
  const percentage = (progetto.funds / progetto.quota) * 100;
  const fundRaisingDeadline = progetto.fundRaisingDeadline;
  const isMyProject = props.isMyProject;
  const { address } = progetto;
  const { progettiFavourites } = props;
  const [toggleHeart, setToggleHeart] = useState(false);

  //if(progetto?.funds == 0 && )
  useEffect(() => {
    setToggleHeart(
      progettiFavourites && Array.isArray(progettiFavourites)
        ? progettiFavourites.includes(props.address)
        : false
    );
  }, [progettiFavourites]);

  function handleRedirect(e) {
    navigate(`/card/${address}`);
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
            <IconInfoDai
              img={PCDollarIcon}
              text={progetto.funds}
              text2={`${t("of")} ${progetto.quota}`}
            />
            <IconInfoCard
              img={PCUserIcon}
              text={`${progetto.investorsNumber} ${t("investors")}`}
            />
            {
              <IconInfoCard
                img={PCCalendarIcon}
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
                    <div>{t("withdrawfunds")}</div>
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
                <img src={IconHeartActive} />
              ) : (
                <img src={IconHeart} />
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
