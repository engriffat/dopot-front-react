import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileHero from "../assets/img/pc-hero-img.png";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileImg from "../assets/img/profile-img.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
// import ProfileIcon2 from "../assets/img/profile-icon-camp.png";
import ProfileIcon2 from "../assets/img/ins-project-def.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIcon5 from "../assets/img/widget.png";
import ProfileIcon6 from "../assets/img/impostazioni.png";
import ProfileIconGrd1 from "../assets/img/profile-icon-grd-1.png";
import ProfileIconGrd2 from "../assets/img/profile-icon-grd-2.png";
import BlogImg from "../assets/img/void.jpg";
import ProfileCardLeft from "../components/Profile/ProfileCardLeft";
import React, { useState, useEffect } from "react";
import { getRecoil, setRecoil } from "recoil-nexus";
import { addressState } from "../recoilState";

import "react-circular-progressbar/dist/styles.css";
import SmallProject from "../components/SmallProject";
import SmallTier from "../components/SmallTier";
import {
  retriveFavorites,
  retriveInvestment,
} from "../utils/firebase/retriveInfo";
import IconDown from "../assets/img/arr-menu.svg";

const Profile = () => {
  const [investedCard, setinvestedCard] = useState([]);
  const [favoriteCard, setfavoriteCard] = useState([]);
  const [isActive, setActive] = useState(true);
  const [isActive2, setActive2] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      var invested = await retriveInvestment();
      var tempCard = [];
      for (let index = 0; index < invested.length; index++) {
        const element = invested[index];
        tempCard.push(
          <SmallTier
            address={element.addressContract}
            tier={element.tier}
          ></SmallTier>
        );
      }
      setinvestedCard(tempCard);

      var favorites = await retriveFavorites();
      var tempCard = [];
      for (let index = 0; index < favorites.length; index++) {
        const element = favorites[index];
        tempCard.push(
          <SmallProject
            address={element.addressContract}
            tier={element.tier}
          ></SmallProject>
        );
      }
      setfavoriteCard(tempCard);
    }

    fetchData();
  }, []);

  const percentage = 65;

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
                    Profilo di{" "}
                    {getRecoil(addressState).toString().substring(0, 5) +
                      "..." +
                      getRecoil(addressState).toString().substring(38, 42)}
                  </h3>

                  <img src={ProfileImg} alt="" />
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
                      <p>Panoramica</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/insprogetto"}>
                      <img src={ProfileIcon2} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/insprogetto"}>
                      <p>Crea Campagna</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/mynft"}>
                      <img src={ProfileIcon3} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/mynft"}>
                      <p>I Miei NFT</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/myprojects"}>
                      <img src={ProfileIcon4} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>I Miei Progetti</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/xdao"}>
                      <img src={ProfileIcon5} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/xdao"}>
                      <p>xDao Widgets</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/impostazioni"}>
                      <img src={ProfileIcon6} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/impostazioni"}>
                      <p>Impostazioni</p>
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
            <p>I miei Investimenti</p>
          </div>
          <div className="sec-pref-desk-flex">
            <img src={ProfileIconGrd2} alt="ProfileIconGrd" />
            <p>I miei preferiti</p>
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
              <p>I miei Investimenti</p>
            </button>
          </div>
          <div className="sec-pref-mob">
            <button onClick={ToggleSec}>
              <img
                className={isActive ? "shadow-inv" : null}
                src={ProfileIconGrd2}
                alt="ProfileIconGrd"
              />
              <p>I miei preferiti</p>
            </button>
          </div>
        </div>

        <section className="profile-bottom">
          <div className="box">
            <div className="profile-main-grid">
              {/* <div className="pmg-left">{investedCard}</div> */}
              {/* provvisorio */}
              <div
                style={{ height: "fit-content" }}
                className={isActive2 ? "pmg-right" : "sec-display-none-inv"}
              >
                <div className="pmg-right-card">
                  <div className="pmg-rc-left-invest">
                    <h3>Mentadent</h3>
                    <div class="menu-nav">
                      <div class="dropdown-container" tabindex="-1">
                        <div class="three-dots"></div>
                        <div class="dropdown">
                          <a href="/#/swap">
                            <div>Swap</div>
                          </a>
                          <a href="#">
                            <div>Dati Spedizione</div>
                          </a>
                          <a href="#">
                            <div>Rimborso</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pmg-rc-right">
                    <div className="pc-hero-icon-grid"></div>
                    <div className="pc-70-box"></div>
                  </div>
                  <div className="pmg-btn-box">
                    <button className="grd-btn dopot-btn-lg">
                      Scopri di più
                    </button>
                  </div>
                </div>
              </div>
              {/* provvisorio */}

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
