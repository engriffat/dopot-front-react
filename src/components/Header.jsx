/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import { MdMenu, MdClear } from "react-icons/md";
import { SocialIcon } from "react-social-icons";
import { useTranslation } from "../i18n/client";
import { FaTimes } from 'react-icons/fa';
import { getAddr } from "../utils/firebase/retriveInfo";
import { ethers } from "ethers";
import Link from 'next/link';

async function isWalletConnected() {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider && (await provider.send("eth_accounts", [])).length > 0;
  }
}

function deleteDatabase(dbName) {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(dbName);
    deleteRequest.onsuccess = () => resolve(`Deleted ${dbName} successfully`);
    deleteRequest.onerror = (event) => new Error(`Error deleting ${dbName}: ${event.target.errorCode}`);
  });
}

const DeleteCookiesAndReload = () => {
  localStorage.clear();
  // Delete all cookies
  if(typeof window !== "undefined"){
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // Clear IndexedDB
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    indexedDB.databases().then((dbs) => {
      const deletePromises = dbs.map((db) => deleteDatabase(db.name));
      return Promise.all(deletePromises);
    }).then((results) => {
      console.log(results);
      window.location.reload();
    }).catch((error) => {
      console.error(error);
    });
    }
}

const Header = (props) => {
  const { t } = useTranslation();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [walletText, setWalletText] = useState("Connect Wallet");
  const [walletState, setWalletState] = useState(false);
  useEffect(() => {
    (async () => {
      setWalletState(await isWalletConnected());
      if(walletState) getAddr(setWalletText, true, t);
    })();
  });
  return (
    <header>
      <div className="box">
        {/* Header for PC */}
        <div className="header-content">
          <div className="header-left">
            <Link href="/">
              <img src={"/assets/img/logo-white.svg"} alt="Dopot" />
            </Link>
          </div>
          <div className="header-right">
            <Link href="/">Home</Link>
            <Link href="/FaqIta">Tutorials</Link>
            <Link href="/Ambassador">Ambassador</Link>
            <Link href="/DopotToken">Dpt Token</Link>

            <div style={{ marginRight: "1.5rem" }} className="dropdown_menu">
              <button className="dropbtn">
                Community{" "}
                <span>
                  <img className="arrow-menu-dr" src={"/assets/img/arr-menu.svg"} alt="" />{" "}
                </span>
              </button>

              <div className="dropdown-content-menu">
                <button>
                  <SocialIcon
                    fgColor="white"
                    url="https://www.instagram.com/dopotfi"
                  />
                </button>
                <button>
                  <SocialIcon
                    fgColor="white"
                    url="https://twitter.com/Dopot_fi"
                  />
                </button>
                <button>
                  <SocialIcon
                    fgColor="white"
                    url="https://discord.gg/j8xxZFsyvd"
                  />
                </button>
                <button>
                  <SocialIcon fgColor="white" url="https://t.me/dopotfi" />
                </button>
              </div>
            </div>
            <div style={{ marginRight: "3.5rem" }} className="dropdown_menu">
              <button className="dropbtn">
                {t("document")}{" "}
                <span>
                  <img
                    style={{ width: "7%" }}
                    className="arrow-menu-dr"
                    src={"/assets/img/arr-menu.svg"}
                    alt=""
                  />
                </span>
              </button>
              <div className="dropdown-content-menu">
                <Link href="/assets/dopot.pdf">Whitepaper</Link>
                <Link href="https://dopot.gitbook.io/dopot/">Gitbook</Link>
                <Link href="https://github.com/solidproof/projects/blob/main/2024/Dopot/SmartContract_Audit_Solidproof_DopotFi.pdf">Audit</Link>
              </div>
            </div>
            {walletState && (
              <Link href="/Profile">
                <button className="grd-btn dopot-btn-sm">Account</button>
              </Link>
            )}

            <button
              className="purple-border-btn dopot-btn-sm"
              onClick={() => getAddr(setWalletText, false, t)}
            >
              {walletText}
            </button>
            <Link href="/" onClick={DeleteCookiesAndReload}>
              <FaTimes />
            </Link>
          </div>
        </div>
        {/* Header for Mobile Devices */}
        <div className="header-mob">
          <Link href="/">
            <img src={"/assets/img/logo-white.svg"} alt="Dopot" />
          </Link>

          {isHeaderOpen ? (
            <button
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(false);
              }}
            >
              <MdClear />
            </button>
          ) : (
            <button
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(true);
              }}
            >
              <MdMenu />
            </button>
          )}

          {isHeaderOpen ? (
            <div className="header-mob-box">
              <Link href="/">Home</Link>
              <Link href="/FaqIta">Tutorials</Link>
              <Link href="/DopotToken">DPT Token</Link>
              <Link href="/Ambassador">Ambassador</Link>
              <div style={{ marginRight: "1.5rem" }} className="dropdown_menu">
                <button className="dropbtn">
                  Community{" "}
                  <span>
                    <img className="arrow-menu-dr" src={"/assets/img/arr-menu.svg"} alt="" />{" "}
                  </span>
                </button>

                <div className="dropdown-content-menu">
                  <button>
                    <SocialIcon
                      fgColor="white"
                      url="https://www.instagram.com/dopotfi"
                    />
                  </button>
                  <button>
                    <SocialIcon
                      fgColor="white"
                      url="https://twitter.com/Dopot_fi"
                    />
                  </button>
                  <button>
                    <SocialIcon
                      fgColor="white"
                      url="https://discord.gg/j8xxZFsyvd"
                    />
                  </button>
                  <button>
                    <SocialIcon fgColor="white" url="https://t.me/dopotfi" />
                  </button>
                </div>
              </div>
              <div style={{ marginRight: "3.5rem" }} className="dropdown_menu">
                <button className="dropbtn">
                  {t("document")}{" "}
                  <span>
                    <img
                      style={{ width: "7%" }}
                      className="arrow-menu-dr"
                      src={"/assets/img/arr-menu.svg"}
                      alt=""
                    />
                  </span>
                </button>
                <div className="dropdown-content-menu">
                  <Link href="/assets/dopot.pdf">Whitepaper</Link>
                  <Link href="https://dopot.gitbook.io/dopot/">Gitbook</Link>
                  <Link href="https://github.com/solidproof/projects/blob/main/2024/Dopot/SmartContract_Audit_Solidproof_DopotFi.pdf">Audit</Link>
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
