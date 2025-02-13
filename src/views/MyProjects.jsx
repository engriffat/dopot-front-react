import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileImg from "../assets/img/profile-img.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
import ProfileIcon2 from "../assets/img/ins-project-def.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIcon5 from "../assets/img/widget.png";
import ProfileIcon6 from "../assets/img/identity.png";
import IconPlane from "../assets/img/icon-plane.svg";
import ProfileIconGrd1 from "../assets/img/profile-icon-grd-1.png";
import ProfileIconGrd2 from "../assets/img/profile-icon-grd-2.png";
import React, { useState, useEffect } from "react";
import { getRecoil } from "recoil-nexus";
import {
  addressState,
  progettiState,
  progettiImageState,
} from "../recoilState";
import "react-circular-progressbar/dist/styles.css";
import { withdraw } from "../utils/firebase/writeInfos";
import Card from "../components/PaginaCard/Card";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const [projectsCard, setProjectsCard] = useState([]);
  const address = getRecoil(addressState);
  let projects = getRecoil(progettiState);

  async function handleWithdraw(projectAddress) {
    try {
      await toast.promise(withdraw(projectAddress),{
        pending: t("confirm"),
        success: t("withdrawn"),
        error: t("error"),
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      let myProjects = [];
      projects
        .filter((p) => p.addressCreator === address)
        .forEach((project) => {
          myProjects.push(
            <Card
              progetto={project}
              immagini={getRecoil(progettiImageState)[project.address]}
              address={project.address}
              tier={project.tier}
              state={project.stateText}
              withdraw={handleWithdraw}
              isMyProject={true}
            ></Card>
          );
        });

      setProjectsCard(myProjects);
    }
    fetchData();
  }, []);

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
                      <img src={ProfileIcon1} alt="ProfileIcon" />
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
                      <img
                        className="myprojects-img"
                        src={ProfileIcon4}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>{t("myprojects")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={ProfileIcon5} alt="ProfileIcon" />
                    </a>
                    <a
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
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
        <div className="box">
          <a
            href="https://staging.push.org/chat"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="grd-btn"
              style={{ marginTop: "1rem", padding: "1rem" }}
            >
              <div className="shipping">
                <img src={IconPlane} alt="ProfileIcon" />
                <p
                  style={{
                    margin: "0 0 0 1rem",
                    fontSize: "1.75rem",
                  }}
                >
                  {t("shipping")}
                </p>
              </div>
            </button>
          </a>
        </div>

        <div className="box0">
          <div style={{ display: "flex", margin: "8rem 0" }}>
            <img src={ProfileIconGrd1} alt="ProfileIconGrd" />
            <p>{t("myprojects")}</p>
          </div>
        </div>

        <section className="profile-bottom">
          <div className="box">
            <div className="profile-main-grid">{projectsCard}</div>
          </div>
        </section>
        <ToastContainer />
      </main>
    </div>
  );
};

export default Profile;
