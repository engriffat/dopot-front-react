import React, { useState, useEffect } from "react";
import "../styles/components/header.css";
import { MdMenu, MdClear } from "react-icons/md";
import LogoWhite from "../assets/img/logo-white.svg";
import { Outlet, Link } from "react-router-dom";
import Pdf from "../assets/dopot.pdf";
import { SocialIcon } from "react-social-icons";
import IconDown from "../assets/img/arr-menu.svg";
import { useTranslation } from "react-i18next";
import { FaTimes } from 'react-icons/fa';

//import GetAccount from "../utils/ethersUtils.js";
import { getAddr } from "../utils/firebase/retriveInfo";
import { ethers } from "ethers";

async function isWalletConnected() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider && (await provider.send("eth_accounts", [])).length > 0;
}

function deleteCookiesAndReload() {
  localStorage.clear();
  // Delete all cookies
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  // Clear IndexedDB
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  function deleteDatabase(dbName) {
    return new Promise((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(dbName);
      deleteRequest.onsuccess = () => resolve(`Deleted ${dbName} successfully`);
      deleteRequest.onerror = (event) => reject(`Error deleting ${dbName}: ${event.target.errorCode}`);
    });
  }
    indexedDB.databases().then((dbs) => {
    const deletePromises = dbs.map((db) => deleteDatabase(db.name));
    return Promise.all(deletePromises);
  }).then((results) => {
    console.log(results);
    window.location.reload();
  }).catch((error) => {
    console.error(error);
    window.location.reload();
  });
}

const Header = (props) => {
  const { t, i18n } = useTranslation();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [walletText, setwalletText] = useState("Connect Wallet");
  const [walletState, setWalletState] = useState(false);
  useEffect(() => {
    (async () => {
      setWalletState(await isWalletConnected());
      getAddr(setwalletText, true, t);
    })();
  });
  return (
    <header>
      <div className="box">
        {/* Header for PC */}
        <div className="header-content">
          <div className="header-left">
            <a href="/#/">
              <img src={LogoWhite} alt="LogoWhite" />
            </a>
          </div>
          <div className="header-right">
            <a href="/#/">Home</a>
            <a href="/#/FaqIta">Tutorials</a>
            <a href="/#/ambassador">Ambassador</a>
            <a href={"/#/dopottoken"}>Dpt Token</a>

            <div style={{ marginRight: "1.5rem" }} className="dropdown_menu">
              <button className="dropbtn">
                Community{" "}
                <span>
                  <img className="arrow-menu-dr" src={IconDown} alt="" />{" "}
                </span>
              </button>

              <div className="dropdown-content-menu">
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://www.instagram.com/dopotfi"
                  />
                </a>
                {/* <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://www.facebook.com/dopot.fi"
                  />
                </a> */}
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://twitter.com/Dopot_fi"
                  />
                </a>
                {/* <a>
                  <SocialIcon
                    fgColor="white"
                    bgColor="#EE1D52"
                    url="https://www.tiktok.com/@dopotfi"
                  />
                </a> 
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://reddit.com/r/dopotfi/s/qWC4ui9Fl9"
                  />
                </a>*/}
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://discord.gg/j8xxZFsyvd"
                  />
                </a>
                <a>
                  <SocialIcon fgColor="white" url="https://t.me/dopotfi" />
                </a>
              </div>
            </div>
            <div style={{ marginRight: "3.5rem" }} className="dropdown_menu">
              <button className="dropbtn">
                {t("document")}{" "}
                <span>
                  <img
                    style={{ width: "7%" }}
                    className="arrow-menu-dr"
                    src={IconDown}
                    alt=""
                  />
                </span>
              </button>
              <div className="dropdown-content-menu">
                <a href={Pdf}>Whitepaper</a>
                <a href="https://dopot.gitbook.io/dopot/">Gitbook</a>
                <a href="https://github.com/solidproof/projects/blob/main/2024/Dopot/SmartContract_Audit_Solidproof_DopotFi.pdf">Audit</a>
              </div>
            </div>
            {walletState && (
              <a href={"/#/profile"}>
                <button className="grd-btn dopot-btn-sm">Account</button>
              </a>
            )}

            <button
              className="purple-border-btn dopot-btn-sm"
              onClick={() => getAddr(setwalletText, false, t)}
            >
              {walletText}
            </button>
            <a href="/#/" onClick={deleteCookiesAndReload}>
              <FaTimes />
            </a>
          </div>
        </div>
        {/* Header for Mobile Devices */}
        <div className="header-mob">
          <a href="#">
            <img src={LogoWhite} alt="LogoWhite" />
          </a>

          {isHeaderOpen ? (
            <div
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(false);
              }}
            >
              <MdClear />
            </div>
          ) : (
            <div
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(true);
              }}
            >
              <MdMenu />
            </div>
          )}

          {isHeaderOpen ? (
            <div className="header-mob-box">
              <a href="#">Home</a>
              <a href="/#/FaqIta">Tutorials</a>
              <a href={"/#/dopottoken"}>DPT Token</a>
              <a href="/#/ambassador">Ambassador</a>
              <div style={{ marginRight: "1.5rem" }} className="dropdown_menu">
                <button className="dropbtn">
                  Community{" "}
                  <span>
                    <img className="arrow-menu-dr" src={IconDown} alt="" />{" "}
                  </span>
                </button>

                <div className="dropdown-content-menu">
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://www.instagram.com/dopotfi"
                    />
                  </a>
                  {/* <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://www.facebook.com/dopot.fi"
                    />
                  </a> */}
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://twitter.com/Dopot_fi"
                    />
                  </a>
                  {/* <a>
                     <SocialIcon
                      fgColor="white"
                      bgColor="#EE1D52"
                      url="https://www.tiktok.com/@dopotfi"
                    /> 
                  </a>
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://reddit.com/r/dopotfi/s/qWC4ui9Fl9"
                    />
                  </a>*/}
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://discord.gg/j8xxZFsyvd"
                    />
                  </a>
                  <a>
                    <SocialIcon fgColor="white" url="https://t.me/dopotfi" />
                  </a>
                </div>
              </div>
              <div style={{ marginRight: "3.5rem" }} className="dropdown_menu">
                <button className="dropbtn">
                  {t("document")}{" "}
                  <span>
                    <img
                      style={{ width: "7%" }}
                      className="arrow-menu-dr"
                      src={IconDown}
                      alt=""
                    />
                  </span>
                </button>
                <div className="dropdown-content-menu">
                  <a href={Pdf}>Whitepaper</a>
                  <a href="https://dopot.gitbook.io/dopot/">Gitbook</a>
                  <a href="https://github.com/solidproof/projects/blob/main/2024/Dopot/SmartContract_Audit_Solidproof_DopotFi.pdf">Audit</a>
                </div>
              </div>

              {walletState && (
                <button className="grd-btn dopot-btn-lg">Account</button>
              )}
              <button className="purple-border-btn dopot-btn-lg">
                {walletState ? "Wallet" : "Connect Wallet"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
