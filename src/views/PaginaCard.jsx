import React, { useState } from "react";
import "../styles/globals.css";
import "../styles/paginacard.css";
import PaginaCardHero from "../assets/img/pc-hero-img.png";
import PCDollarIcon from "../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../assets/img/pc-person-icon.png";
import PCCalendarIcon from "../assets/img/pc-calendar-icon.png";
import PC70 from "../assets/img/pc-70.png";
import IconPlane from "../assets/img/icon-plane.svg";
import IconHeart from "../assets/img/pc-heart-icon-02.svg";
import ImageIcon from "../assets/img/pc-img-icon.png";
import IconInfoCard from "../components/PaginaCard/IconInfoCard";
import InvestiCard from "../components/PaginaCard/InvestiCard";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { progettiState, progettiImageState } from "../recoilState";
import { getRecoil, setRecoil } from "recoil-nexus";
import { getIPFSimage } from "../utils/downloadProj";
import TabCampagna from "../components/TabCampagna";
import TabRoadmap from "../components/TabRoadmap";
import TabFaq from "../components/TabFaq";
import TabSocial from "../components/TabSocial";
import { addFavorites } from "../utils/firebase/writeInfos";

const PaginaCard = () => {
  let { address } = useParams();
  var progetto = getRecoil(progettiState).find((x) => x.address === address);
  const cards = [];
  var i = 1;

  for (var i = 1; i < parseInt(progetto.numeroProdotti) + 1; i++) {
    cards.push(
      <InvestiCard
        address={progetto.address}
        numTier={i}
        spec={progetto["specTecnica" + i]}
        supply={progetto["supply" + i]}
        prezzo={progetto["prezzo" + i]}
        img={"data:image/jpg;base64," + progetto.logoAziendaListFiles["base64"]}
        titolo={progetto["nomeProdotto" + i]}
      ></InvestiCard>
    );
  }

  const percentage = 90;

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
          <img
            className="pagina-card-hero-img"
            src={PaginaCardHero}
            alt="PaginaCardHero"
          />
          <div className="box">
            <img className="image-icon" src={ImageIcon} alt="ImageIcon" />
            <div className="pc-hero-grid">
              <div className="pc-hero-grid-left">
                <h1>{progetto.nomeAzienda}</h1>
                <p>
                  {progetto.descProgetto}
                  <br />
                </p>
                <div className="pc-hero-icon-grid">
                  <IconInfoCard
                    img={PCDollarIcon}
                    text="324.211 su 200.00 Draccolti"
                  />
                  <IconInfoCard
                    img={PCUserIcon}
                    text="2304 persone hanno investito"
                  />
                  <IconInfoCard
                    img={PCDollarIcon}
                    text="21 giorni al termine"
                  />
                </div>
                {/*<div className="pc-btn-box">
                  <button
                    onClick={() => addFavorites(progetto.address)}
                    className="grd-btn dopot-btn-lg"
                  >
                    <img src={IconHeart} alt="IconPlane" /> Salva
                  </button>
                  <button className="grd-btn dopot-btn-lg">
                    <img src={IconPlane} alt="IconPlane" /> Scopri di più
                  </button>
              </div>*/}
              </div>
              <div className="pc-hero-grid-right">
                <div className="pc-70-box">
                  <p>
                    Investimento <br /> completo al
                  </p>
                  <div className="graph-box">
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      strokeWidth={5}
                    />
                    ;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="anchor-links-box">
          <div className="box">
            <div className="alb-content">
              <a
                onClick={() => setTab(0)}
                className={isCurrentState(0) ? "pc-active-link" : ""}
              >
                Campagna
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
                FAQ
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
                      />
                    );
                  case 1:
                    return (
                      <TabRoadmap
                        titoloRoadStep1={progetto.titoloRoadStep1}
                        titoloRoadStep2={progetto.titoloRoadStep2}
                        descrRoadStep1={progetto.descrRoadStep1}
                        descrRoadStep2={progetto.descrRoadStep2}
                      />
                    );
                  case 3:
                    return (
                      <TabSocial
                        socialMedia={progetto.socialMedia.split(",")}
                      ></TabSocial>
                    );
                  case 4:
                    return <TabFaq progetto={progetto} />;

                  default:
                    break;
                }
              })()}
              <div className="pc-content-grid-right">
                <div className="basic-info-box">
                  <img
                    src={(() => {
                      if (progetto.logoAzienda != null) {
                        return (
                          "data:image/jpg;base64," +
                          progetto.logoAziendaListFiles.base64
                        );
                      } else return ImageIcon;
                    })()}
                    alt="ImageIcon"
                  />
                  <h3>{progetto.nomeAzienda}</h3>
                  <p>
                    Campagna di {progetto.tipoCampagna}. <br />
                    Team composta da {progetto.team}.<br />
                    Nel settore della {progetto.settore}.<br />
                    Sito Web {progetto.sito}
                    P.iva {progetto.pIva}
                  </p>
                </div>
                <h5>Investi</h5>

                {cards}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaginaCard;
