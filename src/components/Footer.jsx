import React from "react";
import "../styles/components/footer.css";
import { SocialIcon } from "react-social-icons";
import Pdf from "../assets/dopot.pdf";
import { useTranslation } from "react-i18next";
import openSourceImg from "../assets/img/open-source.png";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="box">
        <div className="footer-grid">
          <div className="footer-grid-box">
            <h4>{t("contact")}</h4>
            <a href="mailto:info@dopot.fi ">info@dopot.fi </a>
          </div>
          <div className="footer-grid-box">
            <h4>{t("services")}</h4>
            <a href="/#/insprogetto">{t("createcampaign")}</a>
            <a href="/#/dopottoken">Dopot Token</a>
            {/* <a href="#">{t('learn')}</a> */}
            <a href="/#/FaqIta">Tutorials</a>
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
            <a href={Pdf}>Whitepaper </a>
            <a href="https://dopot.gitbook.io/dopot/">GitBook </a>
            <a href="https://github.com/Dopot-Labs">
              <img
                id="badge-button"
                style={{ marginBottom: "2rem" }}
                src={openSourceImg}
                alt="Open Source"
              />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          {/*<a href="#">
            <img
              onClick={logBadgeClick}
              id="badge-button"
              style={{ width: "240px", height: "53px", marginBottom: "2rem" }}
              src="https://static.alchemyapi.io/images/marketing/badge.png"
              alt="Alchemy Supercharged"
            />
          </a>
              */}
          <h6>DOPOT.FI</h6>
          {/* <p>Copyright © 2021 tutti diritti riservati a Dopot.ﬁ</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
