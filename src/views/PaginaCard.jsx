import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "../styles/paginacard.css";
import PaginaCardHero from "../assets/img/pc-hero-img.png";
import PCDollarIcon from "../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../assets/img/pc-person-icon.png";
import IconInfoDai from "../components/PaginaCard/IconInfoDai";

import PCCalendarIcon from "../assets/img/pc-calendar-icon.png";
import PC70 from "../assets/img/pc-70.png";
import IconPlane from "../assets/img/icon-plane.svg";

import ImageIcon from "../assets/img/pc-img-icon.png";
import ImageBackLogo from "../assets/img/logo_Mentadent-2.png";
import IconInfoCard from "../components/PaginaCard/IconInfoCard";
import InvestiCard from "../components/PaginaCard/InvestiCard";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { progettiState, progettiImageState } from "../recoilState";
import { getRecoil, setRecoil } from "recoil-nexus";
import TabCampagna from "../components/TabCampagna";
import TabRoadmap from "../components/TabRoadmap";
import TabFaq from "../components/TabFaq";
import TabSocial from "../components/TabSocial";
import TabQuestionario from "../components/TabQuestionario";
import TabDocumenti from "../components/TabDocumenti";
import { addFavorites } from "../utils/firebase/writeInfos";
import {
  downloadProjects,
  retriveFavorites,
  RetriveProjectTypes,
  retriveProjectStakes
} from "../utils/firebase/retriveInfo";
import IconHeart from "../assets/img/heart-fav.svg";
import IconHeartActive from "../assets/img/heart-fav-active.svg";
import { useTranslation } from "react-i18next";
const PaginaCard = () => {
  const { t, i18n } = useTranslation();
  const [toggleHeart, setToggleHeart] = useState(false);
  const [progettiStakes, setProgettiStakes] = useState([]);

  let { address } = useParams();
  useEffect(() => {
    (async () => {
      await downloadProjects(t);
      const fav = await retriveFavorites();
      setToggleHeart(fav ? fav.includes(address) : false);
      setProgettiStakes(await retriveProjectStakes(address));
    })();
  });
  let progetto = getRecoil(progettiState).find((x) => x.address === address);
  const [base64Data, setBase64Data] = useState([]);

  useEffect(() => {
    const fetchBase64Data = async () => {
      for (const tier of progetto.imageNftDefListFiles) {
        const response = await fetch(
          tier["image"].replace("ar://", "https://arweave.net/")
        );
        const data = await response.blob();
        setBase64Data((prevData) => [...prevData, data]);
      }
    };

    fetchBase64Data();
  }, []);

  const cards = [];
  let i = 1;

  for (; i < parseInt(progetto.numeroProdotti) + 1; i++) {
    cards.push(
      <InvestiCard
        address={progetto.address}
        numTier={i}
        spec={progetto["specs" + i]}
        supply={progetto["supply" + i]}
        price={progetto["price" + i]}
        img={base64Data[i - 1]}
        titolo={progetto["name" + i]}
        currentSupply={progetto.imageNftDefListFiles[i - 1]["currentSupply"]}
        state={progetto.stateText}
      ></InvestiCard>
    );
  }

  const percentage = (progetto.funds / progetto.quota) * 100;

  const [tab, setTab] = useState(0);

  function isCurrentState(i) {
    if (tab == i) {
      return true;
    }
    return false;
  }

  return (
    <div className="app">
      <main className="pagina-card">
        <section className="pc-hero-section">
          {/*<img
            className="pagina-card-hero-img"
            src={ImageBackLogo}
            alt="PaginaCardHero"
          />*/}
          <div className="box-main-header">
            {/* <img className="image-icon" src={ImageIcon} alt="ImageIcon" /> */}
            <div className="pc-hero-grid">
              <div className="pc-hero-grid-left">
                <div className="settore box-bk-over-logo">
                  <span>{RetriveProjectTypes(progetto.settore)}</span>
                </div>

                <h1 className="box-bk-over-logo">{progetto.nomeAzienda}</h1>
                <h3
                  style={{ marginBottom: "2rem" }}
                  className="box-bk-over-logo"
                >
                  <span>
                    <a
                      className="link-social-new "
                      href={progetto.sito}
                      target="_blank"
                    >
                      {progetto.sito}
                    </a>
                  </span>
                </h3>

                <p
                  style={{ lineBreak: "anywhere" }}
                  className="box-bk-over-logo"
                >
                  {progetto.descProgetto}
                </p>

                <div className="pc-btn-box">
                  <button
                    onClick={() => {
                      addFavorites(address, t);
                      setToggleHeart(!toggleHeart);
                    }}
                    // className="grd-btn dopot-btn-lg"
                    style={{ background: "none", width: "10%" }}
                  >
                    {!toggleHeart ? (
                      <img src={IconHeart} />
                    ) : (
                      <img src={IconHeartActive} />
                    )}
                  </button>
                  {/* <button className="grd-btn dopot-btn-lg">
                    <img src={IconPlane} alt="IconPlane" /> Scopri di più
                  </button> */}
                </div>
                <div className="span-card">
                      <span>
                        <strong>{t("creatoraddress")}:</strong> <a style={{textDecoration: "underline", cursor: "pointer"}} target="_blank" href={`https://app.proofofhumanity.id/profile/${progetto.addressCreator}`} rel="noreferrer">{progetto.addressCreator}</a>
                      </span>
                  </div>
              </div>
              <div className="pc-hero-grid-right">
                <div className="box-bk-over-logo settore right ">
                  <span>{progetto.tipoCampagna}</span>
                </div>

                <div className="pc-hero-icon-grid ">
                  <IconInfoDai
                    img={PCDollarIcon}
                    text={`${progetto.funds}`}
                    text2={`${t("of")} ${progetto.quota}`}
                  />

                  <IconInfoCard
                    img={PCUserIcon}
                    text={`${progetto.investorsNumber} ${t("investors")}`}
                    investors={progetto.investors}
                  />
                  {progetto.fundRaisingDeadline > 0 && (
                    <IconInfoCard
                      img={PCCalendarIcon}
                      text={`${progetto.fundRaisingDeadline} ${t(
                        "daysremaining"
                      )}`}
                    />
                  )}
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
                    ;
                  </div>
                </div>
                <div className="grid-info">
                  <div className="span-card">
                    <span>
                      <strong> {t("teammember")}:</strong> {progetto.team}
                    </span>
                  </div>
                  <div className="span-card">
                    <span>
                      <strong>{t("piva")}:</strong> {progetto.pIva}
                    </span>
                  </div>          
                </div>
                
              </div>
              
            </div>
            
          </div>
        </section>
        <section style={{ background: "rgba(57, 57, 66, 255)" }}>
          <section className="anchor-links-box">
            <div className="box">
              <div className="alb-content">
                <a
                  onClick={() => setTab(0)}
                  className={isCurrentState(0) ? "pc-active-link" : ""}
                >
                  {t("campaignpagecard")}
                </a>
                <a
                  onClick={() => setTab(1)}
                  className={isCurrentState(1) ? "pc-active-link" : ""}
                >
                  Roadmap
                </a>
                <a
                  onClick={() => setTab(2)}
                  className={isCurrentState(2) ? "pc-active-link" : ""}
                >
                  Reward
                </a>
                <a
                  onClick={() => setTab(3)}
                  className={isCurrentState(3) ? "pc-active-link" : ""}
                >
                  Community
                </a>
                <a
                  onClick={() => setTab(4)}
                  className={isCurrentState(4) ? "pc-active-link" : ""}
                >
                  Tutorials
                </a>
                <a
                  onClick={() => setTab(5)}
                  className={isCurrentState(5) ? "pc-active-link" : ""}
                >
                  {t("survey")}
                </a>
                <a
                  onClick={() => setTab(6)}
                  className={isCurrentState(6) ? "pc-active-link" : ""}
                >
                  {t("documentpagecard")}
                </a>
              </div>
            </div>
          </section>
          <section className="pc-main-content">
            <div className="box">
              <div className="pc-content-grid">
                {(() => {
                  switch (tab) {
                    case 0:
                      return (
                        <TabCampagna
                          introduzione={progetto.introduzione}
                          fotoIntroListFiles={progetto.fotoStoriaListFiles}
                          vision={progetto.vision}
                          fotoVisionListFiles={progetto.fotoVisionListFiles}
                          storia={progetto.storia}
                          fotoStoriaListFiles={progetto.fotoStoriaListFiles}
                          address={progetto.address}
                          progettiStakes={progettiStakes}
                        />
                      );
                    case 1:
                      return (
                        <TabRoadmap
                          titoloRoadStep={progetto.titoloRoadStep}
                          descrRoadStep={progetto.descrRoadStep}
                        />
                      );
                    case 3:
                      return (
                        <TabSocial
                          socialMedia={progetto.socialMedia}
                        ></TabSocial>
                      );
                    case 4:
                      return <TabFaq progetto={progetto} />;
                    case 5:
                      return <TabQuestionario progetto={progetto} />;
                    case 6:
                      return <TabDocumenti progetto={progetto} />;

                    default:
                      break;
                  }
                })()}
                <div className="pc-content-grid-right">
                  <div className="basic-info-box">
                    <div className="pmg-btn-box-nft">
                      <input type="checkbox" id="click" />
                      <label for="click" style={{ cursor: "pointer" }}>
                        <img
                          src={(() => {
                            if (progetto.logoAziendaListFiles[0] != null) {
                              return (
                                "https://arweave.net/" +
                                progetto.logoAziendaListFiles[0]
                              );
                            } else return ImageIcon;
                          })()}
                          alt="ImageIcon"
                        />
                      </label>
                      <div class="content logo-center">
                        <img
                          src={(() => {
                            if (progetto.logoAziendaListFiles[0] != null) {
                              return (
                                "https://arweave.net/" +
                                progetto.logoAziendaListFiles[0]
                              );
                            } else return ImageIcon;
                          })()}
                          alt="ImageIcon"
                        />
                        <div class="text"></div>
                        <label for="click" id="temp">
                          x
                        </label>
                      </div>
                    </div>
                    <h3 className="box-bk-over-logo">{progetto.nomeAzienda}</h3>
                    <h4 className="box-bk-over-logo">
                      {t("website")}:{" "}
                      <span>
                        {" "}
                        <a
                          className="link-social-new "
                          href={progetto.sito}
                          target="_blank"
                        >
                          {progetto.sito}
                        </a>{" "}
                      </span>{" "}
                    </h4>
                    {/* <p>
                    Campagna di {progetto.tipoCampagna}. <br />
                    Team composta da {progetto.team}.<br />
                    Nel settore della {RetriveProjectTypes(progetto.settore)}.<br />
                    Sito Web {progetto.sito}
                    P.iva {progetto.pIva}
                  </p> */}
                  </div>
                  <h5>{t("investpagecard")}</h5>

                  {cards}
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default PaginaCard;
