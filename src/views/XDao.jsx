import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
import ProfileIcon2 from "../assets/img/ins-project-def.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIcon5 from "../assets/img/widget.png";
import ProfileIcon6 from "../assets/img/impostazioni.png";
import React from "react";
import { getRecoil } from "recoil-nexus";
import { addressState } from "../recoilState";
import "react-circular-progressbar/dist/styles.css";

const Profile = () => {
  const address = getRecoil(addressState);
  
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
                  <h3>
                    Profilo di{" "}
                    {address && address.toString().substring(0, 5) +
                      "..." +
                      address && address.toString().substring(38, 42)}
                  </h3>
                  {/*<img src={ProfileImg} alt="ProfileImg" />*/}
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
                      <img className="" src={ProfileIcon4} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>I Miei Progetti</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/xdao"}>
                      <img
                        className="myprojects-img"
                        src={ProfileIcon5}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"} target="_blank" rel="noreferrer">
                      <p>DAO</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"https://app.proofofhumanity.id"} target="_blank" rel="noreferrer">
                      <img src={ProfileIcon6} alt="ProfileIcon" />
                    </a>
                    <a href={"https://app.proofofhumanity.id"} target="_blank" rel="noreferrer">
                      <p>Verify Identity</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <iframe
        src={"https://app.aragon.org/#/daos/mumbai/0xc49a8a1f52e7bb17b0656f985b03ae5ef153d844/dashboard"}
        width="100%"
        style={{height: "100vh", filter: "invert(95%)"}}
        title="Full Screen Iframe"
        scrolling="no"
      />
      </main>
    </div>
  );
};

export default Profile;
