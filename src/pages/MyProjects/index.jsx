/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import { getRecoil } from "recoil-nexus";
import {
  addressState,
  progettiState,
  progettiImageState,
} from "../../recoilState.js";
import { withdraw } from "../../utils/firebase/writeInfos.jsx";
import Card from "../../components/PaginaCard/Card.jsx";
import { useTranslation } from "../../i18n/client.js";
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import Image from 'next/image';

const Profile = () => {
  const { t } = useTranslation();
  const [projectsCard, setProjectsCard] = useState([]);
  const address = getRecoil(addressState);
  let projects = getRecoil(progettiState);

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
              loadFees={true}
            ></Card>
          );
        });

      setProjectsCard(myProjects);
    }

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

    fetchData();
}, [address, projects, t]);

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
              loadFees={true}
            ></Card>
          );
        });

      setProjectsCard(myProjects);
    }
    fetchData();
  }, [address, projects]);

  return (
    <div className="app">
      <main className="profile-page">
        <section className="profile-top-section">
          <div className="box">
            <div className="pts-content">
              <div className="pts-left">
                <Link href="/">
                  <img src={"/assets/img/profile-icon-arrow-left.png"} alt="ProfileIconArrowLeft" />
                </Link>
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
                    <Link href={"/Profile"}>
                      <img src={"/assets/img/profile-icon-1.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"/Profile"}>
                      <p>{t("overview")}</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/InsProgetto"}>
                      <img src={"/assets/img/ins-project-def.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"/InsProgetto"}>
                      <p>{t("createcampaign")}</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/MyNft"}>
                      <img src={"/assets/img/profile-icon-3.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"/MyNft"}>
                      <p>{t("mynft")}</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/MyProjects"}>
                      <img
                        className="myprojects-img"
                        src={"/assets/img/profile-icon-4.png"}
                        alt="ProfileIcon"
                      />
                    </Link>
                    <Link href={"/MyProjects"}>
                      <p>{t("myprojects")}</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={"/assets/img/widget.png"} alt="ProfileIcon" />
                    </Link>
                    <Link
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>DAO</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={"/assets/img/identity.png"} alt="ProfileIcon" />
                    </Link>
                    <Link
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>{t("identity")}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="box">
          <Link
            href="https://app.push.org/chat"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="grd-btn"
              style={{ marginTop: "1rem", padding: "1rem" }}
            >
              <div className="shipping">
                <img src={"/assets/img/icon-plane.svg"} alt="ProfileIcon" />
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
          </Link>
        </div>

        <div className="box0">
          <div style={{ display: "flex", margin: "8rem 0" }}>
            <img src={"/assets/img/profile-icon-grd-1.png"} alt="ProfileIconGrd" />
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
