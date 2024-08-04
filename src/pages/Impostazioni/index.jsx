/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import { getRecoil } from "recoil-nexus";
import { addressState } from "../../recoilState";
import Link from 'next/link';

const Profile = () => {
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
                    Profilo di{" "}
                    {getRecoil(addressState)?.toString().substring(0, 5) +
                      "..." +
                      getRecoil(addressState)?.toString().substring(38, 42)}
                  </h3>
                  <img src={"/assets/img/profile-img.png"} alt="ProfileImg" />
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <Link href="/profile">
                      <img src={"/assets/img/profile-icon-1.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href="/profile">
                      <p>Panoramica</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href="/InsProgetto">
                      <img src={"/assets/img/ins-project-def.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href="/InsProgetto">
                      <p>Crea Campagna</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href="/MyNft">
                      <img src={"/assets/img/profile-icon-3.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href="/MyNft">
                      <p>I Miei NFT</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href="/MyProjects">
                      <img className="" src={"/assets/img/profile-icon-4.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href="/MyProjects">
                      <p>I Miei Progetti</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href="https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard" target="_blank" rel="noreferrer">
                      <img src={"/assets/img/widget.png"} alt="ProfileIcon" />
                    </Link>
                    <Link href="https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard" target="_blank" rel="noreferrer">
                      <p>DAO</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href="https://app.proofofhumanity.id" target="_blank" rel="noreferrer">
                      <img
                        className="myprojects-img"
                        src={"/assets/img/impostazioni.png"}
                        alt="ProfileIcon"
                      />
                    </Link>
                    <Link href="https://app.proofofhumanity.id" target="_blank" rel="noreferrer">
                      <p>Verify Identity</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
