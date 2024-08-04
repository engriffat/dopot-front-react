/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import "./styles/home.css";
import "./styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/components/footer.css";
import "./styles/loading.css";
import "./styles/dashboard.css";
import "./styles/paginacard.css";
import "./styles/profile.css";
import "./styles/dopottoken.css";
import "./styles/components/header.css";
import "react-circular-progressbar/dist/styles.css";
import "./styles/ins-progetto.css";
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";


import Footer from "../components/Footer.jsx";
import { MdClear } from "react-icons/md";
import { useTranslation } from "../i18n/client.js";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import { checkAdBlock } from "adblock-checker";
import Link from 'next/link';
import { RecoilRoot } from 'recoil';
import RecoilNexus from "recoil-nexus";

export default function App({ Component, pageProps }) {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      toast.info(t("web3Notice"));
    }
    const checkAdblock = async () => {
      if (await checkAdBlock()) 
        toast.info(t("adblockNotice"));
    };
    checkAdblock();
  }, [t]);

  return (
    <RecoilRoot>
    <RecoilNexus />
    <div className="app">
      <main className="home">
        <ToastContainer />
        {/* Hero Section */}
        <Component t={t} {...pageProps} />
      </main>
      <Footer />
    </div>
    </RecoilRoot>

  );
};
