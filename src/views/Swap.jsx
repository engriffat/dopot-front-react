import React from "react";
import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileHero from "../assets/img/pc-hero-img.png";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileImg from "../assets/img/profile-img.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
import ProfileIcon2 from "../assets/img/ins-project-def.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIcon5 from "../assets/img/widget.png";
import ProfileIcon6 from "../assets/img/impostazioni.png";
import SwapImg from "../assets/img/swap-img.png";
import SwapDownArrow from "../assets/img/swap-down-arrow.png";
import SwapBtn from "../assets/img/swap-btn.png";
import "react-circular-progressbar/dist/styles.css";
import { MdKeyboardArrowDown } from "react-icons/md";
const Swap = () => {
  const percentage = 65;
  return (
    <div className="app">
      <main className="profile-page">
        <section className="profile-top-section">
          <div className="box">
            <div className="pts-content">
              <div className="pts-left">
                <a href="#">
                  <img src={ProfileIconArrowLeft} alt="ProfileIconArrowLeft" />
                </a>
                <div className="profile-img-box">
                  <h3>Profilo di Tommaso</h3>
                  <img src={ProfileImg} alt="ProfileImg" />
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <a href={"/#/profile"}>
                      <img src={ProfileIcon1} alt="ProfileIcon" />
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
                    <a href={"/#/dao"}>
                      <img src={ProfileIcon5} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/dao"}>
                      <p>Dao Widget</p>
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
        <section className="swap-section">
          <div className="box">
            <div className="swap-btns-box">
              <button className="purple-border-btn dopot-btn-lg">Equity</button>
              <button className="grd-btn dopot-btn-lg">Reward</button>
            </div>
            <div className="swap-container">
              <div className="swap-heading">
                <h3>Swap</h3>
                <img src={SwapImg} alt="SwapImg" />
              </div>
              <div className="swap-inputs-box">
                <div className="swap-input-box">
                  <input type="text" />
                  <button>
                    <span>DAI</span> <MdKeyboardArrowDown />
                  </button>
                </div>
                <img
                  className="swap-down-arrow"
                  src={SwapDownArrow}
                  alt="SwapDownArrow"
                />
                <div className="swap-input-box">
                  <input type="text" />
                  <button>
                    <span>Select NFT</span> <MdKeyboardArrowDown />
                  </button>
                </div>
              </div>
              <div className="swap-btn-box">
                <button className="swap-btn">
                  <img src={SwapBtn} alt="SWAP" />
                  <span>SWAP</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Swap;
