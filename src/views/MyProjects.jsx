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
import ProfileIconGrd1 from "../assets/img/profile-icon-grd-1.png";
import ProfileIconGrd2 from "../assets/img/profile-icon-grd-2.png";
import BlogImg from "../assets/img/void.jpg";
import ProfileCardLeft from "../components/Profile/ProfileCardLeft";
import React, { useState, useEffect } from "react";
import { getRecoil, setRecoil } from "recoil-nexus";
import { addressState, progettiState } from "../recoilState";
import "react-circular-progressbar/dist/styles.css";
import { withdraw } from "../utils/firebase/writeInfos";

const Profile = () => {
  const [projectsCard, setProjectsCard] = useState([]);
  const address = getRecoil(addressState);
  let projects = getRecoil(progettiState)

  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      const myProjects = projects.filter(project => project.addressCreator === address);
      console.log(myProjects)
      setProjectsCard(myProjects);
    }
    fetchData();
  }, []);

  async function handleWithdraw(projectAddress){
    const response = window.confirm("Do you want to pay fees with the Dopot token for a discount?");
    await withdraw(projectAddress, response);
    console.log(response)
  }

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
                    {getRecoil(addressState).toString().substring(0, 5) +
                      "..." +
                      getRecoil(addressState).toString().substring(38, 42)}
                  </h3>
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
                      <img
                        className="myprojects-img"
                        src={ProfileIcon4}
                        alt="ProfileIcon"
                      />
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
                    
        <div className="box0">
          <div className="sec-inv-desk-flex">
            <img src={ProfileIconGrd1} alt="ProfileIconGrd" />
            <p>My projects</p>
          </div>
          <a href="https://staging.push.org/chat" target="_blank" rel="noreferrer"> 
            <div className="sec-pref-desk-flex">
              <img src={ProfileIconGrd2} alt="ProfileIconGrd" />
              <p style={{ "color": "lightskyblue", "text-decoration-line": "underline"}}>Shipping Details</p>
            </div>
          </a>
        </div>

        <section className="profile-bottom">
          <div className="box">
            <div className="profile-main-grid">
              {projectsCard && projectsCard.map((card, index) => (
                <div
                    key={index}
                    style={{ height: "fit-content" }}
                    className={"pmg-right"}
                  >
                    <div className="pmg-right-card">
                      <div className="pmg-rc-left-invest">
                        <h3>{card.introduzione}</h3>
                      </div>

                      <div className="pmg-rc-right">
                        <div className="pc-hero-icon-grid"></div>
                        <div className="pc-70-box"></div>
                      </div>
                      <div className="pmg-btn-box">
                        <button className="grd-btn dopot-btn-lg" onClick={async () => await handleWithdraw(card.address)}>
                          Withdraw
                        </button>
                        <button className="grd-btn dopot-btn-lg" onClick={() => { window.location.href = '/#/card/' + card.address }}>
                          Discover more
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
