/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useTranslation } from "../../i18n/client.js";
import Image from 'next/image'

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
                <img src={"/assets/img/img-1.png"} alt="dopot votazioni" />
                <p>{t("dptsecure")}</p>
              </div>
              <div className="p-card">
                <img src={"/assets/img/img-2.png"} alt="dopot dex" />
                <p>{t("dptdece")}</p>
              </div>
              <div className="p-card">
                <img src={"/assets/img/img-3.png"} alt="dopot facilita" />
                <p>{t("dptuti")}</p>
              </div>
              <div className="p-card">
                <img src={"/assets/img/img-4.png"} alt="dopot sostenibilità" />
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
      </main>
    </div>
  );
};

export default DopotPower;
