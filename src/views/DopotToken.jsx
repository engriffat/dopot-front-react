import React from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header";
import "../styles/components/header.css";
import DImg1 from "../assets/img/img-1.png";
import DImg2 from "../assets/img/img-2.png";
import DImg3 from "../assets/img/img-3.png";
import DImg4 from "../assets/img/img-4.png";
import "react-circular-progressbar/dist/styles.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopottoken.css";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const DopotPower = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box">
          <div className="dopot-power">
            <h1 className="mb-5">{t("dpttitle")}</h1>
            <h2>{t("dpth2")}</h2>
            <h3>{t("dpth3")}</h3>
            {/* <img className="p-hand-img" src={PHand1} alt="PHand1" /> */}
            <div className="p-cards-grid">
              <div className="p-card">
                <img src={DImg1} alt="dopot votazioni" />
                <p>{t("dptsecure")}</p>
              </div>
              <div className="p-card">
                <img src={DImg2} alt="dopot dex" />
                <p>{t("dptdece")}</p>
              </div>
              <div className="p-card">
                <img src={DImg3} alt="dopot facilita" />
                <p>{t("dptuti")}</p>
              </div>
              <div className="p-card">
                <img src={DImg4} alt="dopot sostenibilità" />
                <p>{t("dptsos")}</p>
              </div>
            </div>
            <h3>
              <strong>{t("dptlisttitle")}</strong>
            </h3>
            <ul>
              <li>{t("dptlist01")}</li>
              <li>{t("dptlist02")}</li>
              <li>{t("dptlist03")}</li>
              <li>{t("dptlist04")}</li>
              <li>{t("dptlist05")}</li>
            </ul>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default DopotPower;
