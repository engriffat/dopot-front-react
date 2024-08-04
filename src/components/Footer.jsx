"use client"
import React from "react";
import { SocialIcon } from "react-social-icons";
import { useTranslation } from "../i18n/client";
import Link from 'next/link';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="box">
        <div className="footer-grid">
          <div className="footer-grid-box">
            <h4>{t("contact")}</h4>
            <Link href="mailto:info@dopot.fi ">info@dopot.fi </Link>
          </div>
          <div className="footer-grid-box">
            <h4>{t("services")}</h4>
            <Link href="/DopotToken">Dopot Token</Link>
            {/* <Link href="/">{t('learn')}</Link> */}
            <Link href="/FaqIta">Tutorials</Link>
          </div>
          <div className="footer-grid-box">
            <h4>Community</h4>
            <div className="footer-social-div">
              <SocialIcon
                fgColor="white"
                url="https://www.instagram.com/dopotfi"
              />
              {/* <SocialIcon
                fgColor="white"
                url="https://www.facebook.com/dopot.fi"
              /> */}
              <SocialIcon fgColor="white" url="https://twitter.com/Dopot_fi" />
            </div>
            <div className="footer-social-div">
              {/* <SocialIcon
                fgColor="white"
                bgColor="#EE1D52"
                url="https://www.tiktok.com/@dopotfi"
              /> 
              <SocialIcon
                fgColor="white"
                url="https://reddit.com/r/dopotfi/s/qWC4ui9Fl9"
              />*/}
              <SocialIcon fgColor="white" url="https://discord.gg/j8xxZFsyvd" />
              <SocialIcon fgColor="white" url="https://t.me/dopotfi" />
            </div>
            <div className="footer-social-div">
              
            </div>
          </div>
          <div className="footer-grid-box">
            <h4>{t("document")}</h4>
            <Link href="/assets/dopot.pdf">Whitepaper </Link>
            <Link href="https://dopot.gitbook.io/dopot/">GitBook </Link>
            <Link href="https://github.com/Dopot-Labs">
              <img
                id="badge-button"
                style={{ marginBottom: "2rem" }}
                src={"/assets/img/open-source.png"}
                alt="Open Source"
              />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          {/*<Link href="/">
            <img
              onClick={logBadgeClick}
              id="badge-button"
              style={{ width: "240px", height: "53px", marginBottom: "2rem" }}
              src="https://static.alchemyapi.io/images/marketing/badge.png"
              alt="Alchemy Supercharged"
            />
          </Link>
              */}
          <h6>DOPOT.FI</h6>
          {/* <p>Copyright © 2021 tutti diritti riservati a Dopot.ﬁ</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
