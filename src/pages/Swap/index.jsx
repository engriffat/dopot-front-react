"use client"
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from 'next/link';

const Swap = () => {
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
                  <h3>Profilo di Tommaso</h3>
                  <img src={"/assets/img/profile-img.png"} alt="ProfileImg" />
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <Link href={"/profile"}>
                      <img src={"/assets/img/profile-icon-1.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"/profile"}>
                      <p>Panoramica</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/InsProgetto"}>
                      <img src={"/assets/img/ins-project-def.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"/InsProgetto"}>
                      <p>Crea Campagna</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/MyNft"}>
                      <img src={"/assets/img/profile-icon-3.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"/MyNft"}>
                      <p>I Miei NFT</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/MyProjects"}>
                      <img src={"/assets/img/profile-icon-4.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"/MyProjects"}>
                      <p>I Miei Progetti</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"} target="_blank" rel="noreferrer">
                      <img src={"/assets/img/widget.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"} target="_blank" rel="noreferrer">
                      <p>DAO</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"https://app.proofofhumanity.id"} target="_blank" rel="noreferrer">
                      <img src={"/assets/img/impostazioni.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href={"https://app.proofofhumanity.id"} target="_blank" rel="noreferrer">
                      <p>Verify Identity</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="swap-section">
          <div className="box">
            <div className="swap-btns-box">
              <button className="purple-border-btn dopot-btn-lg">Equity</button>
              <button className="grd-btn dopot-btn-lg">Reward</button>
            </div>
            <div className="swap-container">
              <div className="swap-heading">
                <h3>Swap</h3>
                <img src={"/assets/img/swap-img.png"} alt="SwapImg" />
              </div>
              <div className="swap-inputs-box">
                <div className="swap-input-box">
                  <input type="text" />
                  <button>
                    <span>DAI</span> <MdKeyboardArrowDown />
                  </button>
                </div>
                <img
                  className="swap-down-arrow"
                  src={"/assets/img/swap-down-arrow.png"}
                  alt="SwapDownArrow"
                />
                <div className="swap-input-box">
                  <input type="text" />
                  <button>
                    <span>Select NFT</span> <MdKeyboardArrowDown />
                  </button>
                </div>
              </div>
              <div className="swap-btn-box">
                <button className="swap-btn">
                  <img src={"/assets/img/swap-btn.png"} alt="SWAP" />
                  <span>SWAP</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Swap;
