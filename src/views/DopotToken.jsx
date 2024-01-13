import React, { useState } from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header";
import "../styles/components/header.css";
import "../styles/components/header.css";
import IconInfoCard from "../components/PaginaCard/IconInfoCard";
import PCDollarIcon from "../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../assets/img/pc-person-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdMenu, MdClear, MdSearch, MdFilterList } from "react-icons/md";
import LogoWhite from "../assets/img/logo-white.svg";
import DImg1 from "../assets/img/img-1.png";
import DImg2 from "../assets/img/img-2.png";
import DImg3 from "../assets/img/img-3.png";
import DImg4 from "../assets/img/img-4.png";
import DImg5 from "../assets/img/img-5.png";
import DImg6 from "../assets/img/img-6.png";
import DImg7 from "../assets/img/img-7.png";
import DImg8 from "../assets/img/img-8.png";
import PHand1 from "../assets/img/p-img-1.png";
import PHand2 from "../assets/img/p-img-2.png";
import PBottom from "../assets/img/pc-hero-img.png";
import "react-circular-progressbar/dist/styles.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopottoken.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const DopotPower = () => {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box">
          <div className="dopot-power">
            <h1 className="mb-5">{t("dpttitle")}</h1>

            {/* <div className="p-btn-box">
              <button
                style={{
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                  border: "2px solid rgb(186, 178, 178)",
                }}
                className="grd-btn dopot-btn-lg"
              >
                Dopotpower
              </button>

              <button
                style={{
                  border: "2px solid rgb(186, 178, 178)",
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                  boxShadow: "none",
                }}
                onClick={(e) => navigate("/dopotshare")}
                className="purple-border-btn dopot-btn-lg"
              >
                Dopotshare
              </button>
            </div> */}
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
            </ul>
          </div>
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
        <Footer />
      </main>
    </div>
  );
};

export default DopotPower;
