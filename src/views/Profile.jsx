import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileImg from "../assets/img/profile-img.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
// import ProfileIcon2 from "../assets/img/profile-icon-camp.png";
import ProfileIcon2 from "../assets/img/ins-project-def.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIcon5 from "../assets/img/widget.png";
import ProfileIcon6 from "../assets/img/identity.png";
import ProfileIconGrd1 from "../assets/img/profile-icon-grd-1.png";
import ProfileIconGrd2 from "../assets/img/profile-icon-grd-2.png";
import React, { useState, useEffect } from "react";
import { getRecoil, setRecoil } from "recoil-nexus";
import {
  addressState,
  progettiState,
  progettiImageState,
} from "../recoilState";

import "react-circular-progressbar/dist/styles.css";
import CardPref from "../components/PaginaCard/CardPref";
import { useTranslation } from "react-i18next";

import {
  retriveFavorites,
  retriveInvestment,
} from "../utils/firebase/retriveInfo";
import IconDown from "../assets/img/arr-menu.svg";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const [investedCard, setinvestedCard] = useState([]);
  const [favoriteCard, setfavoriteCard] = useState([]);
  const [isActive, setActive] = useState(true);
  const [isActive2, setActive2] = useState(false);
  const address = getRecoil(addressState);
  let projects = getRecoil(progettiState);
  
  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      let tempCard = [];
      const favorites = await retriveFavorites();
      //console.dir(projects);
      for (const project of projects) {
        if(!project.investors) continue;
        let tiers = project.investors[address];
        for (const tierId in tiers) {
          if (tiers.hasOwnProperty(tierId) /* && tiers[tierId] !== 0*/) {
            tempCard.push(
              <CardPref
                progetto={project}
                immagini={getRecoil(progettiImageState)[project.address]}
                address={project.address}
                tier={project.tier}
                progettiFavourites={favorites}
              ></CardPref>
            );
          }
        }
      }
      setinvestedCard(tempCard);

      let tempCard2 = [];
      for (const element of favorites) {
        let project = projects.find((project) => project.address === element);
        tempCard2.push(
          <CardPref
            progetto={project}
            immagini={getRecoil(progettiImageState)[project.address]}
            address={project.address}
            tier={project.tier}
            progettiFavourites={favorites}
          ></CardPref>
        );
      }
      setfavoriteCard(tempCard2);
    }

    fetchData();
  }, []);

  const ToggleSec = () => {
    setActive(!isActive);
    setActive2(false);
  };
  const ToggleSec2 = () => {
    setActive2(!isActive2);
    setActive(false);
  };

  return (
    <div className="app">
      <main className="profile-page">
        <section className="profile-top-section">
          {/* <img className="profile-hero" src={ProfileHero} alt="ProfileHero" /> */}

          <div className="box">
            <div className="pts-content">
              <div className="pts-left">
                <a href="#">
                  <img src={ProfileIconArrowLeft} alt="ProfileIconArrowLeft" />
                </a>
                <div className="profile-img-box">
                  <h3>
                    {t("profileof")}{" "}
                    {address &&
                      address.toString().substring(0, 5) + "..." + address &&
                      address.toString().substring(38, 42)}
                  </h3>
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <a href={"/#/profile"}>
                      <img
                        className="panoramica-img"
                        src={ProfileIcon1}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"/#/profile"}>
                      <p>{t("overview")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/insprogetto"}>
                      <img src={ProfileIcon2} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/insprogetto"}>
                      <p>{t("createcampaign")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/mynft"}>
                      <img src={ProfileIcon3} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/mynft"}>
                      <p>{t("mynft")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/myprojects"}>
                      <img src={ProfileIcon4} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>{t("myprojects")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a
                      href={
                        "https://app.aragon.org/#/daos/mumbai/0x74faaa177dfd30343616c7bf2ccae6d7f91f32ed/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={ProfileIcon5} alt="ProfileIcon" />
                    </a>
                    <a
                      href={
                        "https://app.aragon.org/#/daos/mumbai/0x74faaa177dfd30343616c7bf2ccae6d7f91f32ed/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>DAO</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={ProfileIcon6} alt="ProfileIcon" />
                    </a>
                    <a
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>{t("identity")}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="box0">
          <div className="sec-inv-desk-flex">
            <img src={ProfileIconGrd1} alt="ProfileIconGrd" />
            <p>{t("myinvestments")}</p>
          </div>
          <div className="sec-pref-desk-flex">
            <img src={ProfileIconGrd2} alt="ProfileIconGrd" />
            <p>{t("myfavourites")}</p>
          </div>
        </div>

        <div className="box1">
          <div className="sec-inv-mob">
            <button onClick={ToggleSec2}>
              <img
                className={isActive2 ? "shadow-inv" : null}
                src={ProfileIconGrd1}
                alt="ProfileIconGrd"
              />
              <p>{t("myinvestments")}</p>
            </button>
          </div>
          <div className="sec-pref-mob">
            <button onClick={ToggleSec}>
              <img
                className={isActive ? "shadow-inv" : null}
                src={ProfileIconGrd2}
                alt="ProfileIconGrd"
              />
              <p>{t("myfavourites")}</p>
            </button>
          </div>
        </div>

        <section className="profile-bottom">
          <div className="box">
            <div className="profile-main-grid">
              <div className={isActive2 ? "pmg-left" : "sec-display-none-inv"}>
                {investedCard}
              </div>

              <div className={isActive ? "pmg-right" : "sec-display-none-pref"}>
                {favoriteCard}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
