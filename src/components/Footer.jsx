import React from "react";
import "../styles/components/footer.css";
import { SocialIcon } from "react-social-icons";
import Pdf from "../assets/dopot.pdf";
import { useTranslation } from "react-i18next";

const BADGE_ID = "fb48ca1409e7f6fe";
let ALCHEMY_URL = `https://alchemyapi.io/?r=badge:${BADGE_ID}`;
const ALCHEMY_ANALYTICS_URL = `https://analytics.alchemyapi.io/analytics`;

function logBadgeClick() {
  fetch(`${ALCHEMY_ANALYTICS_URL}/badge-click`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      badge_id: BADGE_ID,
    }),
  });
  window.open(ALCHEMY_URL, "_blank").focus();
}

function logBadgeView() {
  fetch(`${ALCHEMY_ANALYTICS_URL}/badge-view`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      badge_id: BADGE_ID,
    }),
  });
}

function isBadgeInViewpoint(bounding) {
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

var intervalId = setInterval(() => {
  const badge = document.getElementById("badge-button");
  if (badge && isBadgeInViewpoint(badge.getBoundingClientRect())) {
    logBadgeView();
    clearInterval(intervalId);
  }
}, 2000);

const Footer = () => {
  const { t, i18n } = useTranslation();
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
            <a href="#">{t("createcampaign")}</a>
            <a href="#">Dopot Token</a>
            {/* <a href="#">{t('learn')}</a> */}
            <a href="#">FAQ</a>
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
              /> */}
              <SocialIcon
                fgColor="white"
                url="https://www.reddit.com/user/Dopotfi/"
              />
              <SocialIcon fgColor="white" url="https://discord.gg/j8xxZFsyvd" />
            </div>
          </div>
          <div className="footer-grid-box">
            <h4>Documenti Aziendali</h4>
            <a href={Pdf}>Whitepaper </a>
            <a href="https://dopot.gitbook.io/dopot/">GitBook </a>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#">
            <img
              onClick={logBadgeClick}
              id="badge-button"
              style={{ width: "240px", height: "53px", marginBottom: "2rem" }}
              src="https://static.alchemyapi.io/images/marketing/badge.png"
              alt="Alchemy Supercharged"
            />
          </a>
          <h6>DOPOT.FI</h6>
          {/* <p>Copyright © 2021 tutti diritti riservati a Dopot.ﬁ</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
