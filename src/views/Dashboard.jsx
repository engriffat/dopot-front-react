import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header";
import "../styles/components/header.css";
import "../styles/components/header.css";
import { MdMenu, MdClear, MdSearch, MdFilterList } from "react-icons/md";
import LogoWhite from "../assets/img/logo-white.svg";
import Card from "../components/PaginaCard/Card";
import "react-circular-progressbar/dist/styles.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import { progettiState, progettiImageState } from "../recoilState";
import { getRecoil, setRecoil } from "recoil-nexus";
import Footer from "../components/Footer";
import {
  downloadProjects,
  retriveFavorites,
} from "../utils/firebase/retriveInfo";
import useSearchForm from "./useSearchForm";

const Home = () => {
  const { t, i18n } = useTranslation();
  const handleSearch = useSearchForm();
  const [progettiFavourites, setProgettiFavourites] = useState([]);

  const cards = [];

  useEffect(() => {
    (async () => {
      await downloadProjects();
      const newData = await retriveFavorites();
      setProgettiFavourites(newData);
    })();
  }, []);

  let progetti = getRecoil(progettiState);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const state = query.get("s") || "ongoing";
  const campaign = query.get("c") || "reward";
  const type = query.get("t") || "any";
  let value = query.get("v") || "any";

  //test
  let expanded = false;

  function showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }
  //test

  progetti = progetti.filter(
    (progetto) =>
      progetto.stateText.toLowerCase().replace(" ", "") === state &&
      progetto.tipoCampagna === campaign &&
      (type !== "any" ? progetto.settore === type : true) &&
      (value !== "any"
        ? progetto.minInvestment >= parseInt(value.split("-")[0]) &&
          progetto.minInvestment <= parseInt(value.split("-")[1])
        : true)
  );

  progetti.forEach((element) => {
    cards.push(
      <Card
        progetto={element}
        progettiFavourites={progettiFavourites}
        immagini={getRecoil(progettiImageState)[element.address]}
        address={element.address}
        tier={element.tier}
      ></Card>
    );
  });

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header />
        </div>
        <div className="box">
          <div className="dashboard-select-btn">
            <div className="dashboard-select-opt">
              <div className="dash-sel-opt-content">
                <label for="sel1">{t("dashlabel1")}</label>
                <select name="sel1" id="sel1">
                  <option value="ongoing">Live Crowdfounding</option>
                  <option value="successful">Closed Crowdfunding</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel2">{t("dashlabel2")}</label>
                <select name="sel2" id="sel2">
                  <option value="reward">Reward Crowdfounding</option>
                  <option value="equity">Equity</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel3">{t("dashlabel3")}</label>
                <select name="sel3" id="sel3">
                  <option selected value="any">
                    {t("dashcategselected")}
                  </option>
                  <option disabled value>
                    {t("social")}
                  </option>
                  <option value="tipo1"> {t("socialcare")}</option>
                  <option value="tipo2"> {t("healthcare")}</option>
                  <option value="tipo3"> {t("socialhealthass")}</option>
                  <option value="tipo4">{t("educationtraining")}</option>
                  <option value="tipo5"> {t("environmental")}</option>
                  <option value="tipo6">{t("enhancementcultural")}</option>
                  <option value="tipo7"> {t("socialtourism")}</option>
                  <option value="tipo8">{t("universitypost")}</option>
                  <option value="tipo9"> {t("extracurricular")}</option>
                  <option value="tipo10">{t("socialenterprises")}</option>
                  <option disabled value>
                    {t("blockchain")}
                  </option>
                  <option value="tipo11">{t("blockchainfinance")}</option>
                  <option value="tipo12">{t("blockchaininsurance")}</option>
                  <option value="tipo13">{t("blockchainpaydigital")}</option>
                  <option value="tipo14">{t("blockchainagrifood")}</option>
                  <option value="tipo15">{t("blockchain4.0")}</option>
                  <option value="tipo16">{t("blockchainiot")}</option>
                  <option value="tipo17">{t("blockchainhealthcare")}</option>
                  <option value="tipo18">
                    {t("blockchainadministration")}
                  </option>
                  <option value="tipo19">{t("blockchainretail")}</option>
                  <option value="tipo20">{t("blockchainmusic")}</option>
                  <option value="tipo21">{t("blockchainsmartenergy")}</option>
                  <option value="tipo22">{t("blockchainunbanked")}</option>
                  <option value="tipo23">{t("cryptostartup")}</option>
                  <option value="tipo24">{t("decentralizedstartup")}</option>
                  <option value="tipo25">{t("decentralizedproject")}</option>
                  <option disabled value>
                    {t("traditional")}
                  </option>
                  <option value="tipo26">{t("foodstartup")}</option>
                  <option value="tipo27">{t("fashionstartup")}</option>
                  <option value="tipo28">{t("wearstartup")}</option>
                  <option value="tipo29">{t("travelstartup")}</option>
                  <option value="tipo30">{t("bigdata")}</option>
                  <option value="tipo31">{t("biotechnology")}</option>
                  <option value="tipo32">{t("ecosustainability")}</option>
                  <option value="tipo33">{t("engineering")}</option>
                  <option value="tipo34">{t("mobile")}</option>
                  <option value="tipo35">{t("modelling")}</option>
                  <option value="tipo36">{t("research")}</option>
                  <option value="tipo37">{t("software")}</option>
                  <option value="tipo38">{t("power")}</option>
                  <option value="tipo39">{t("artificialintelligence")}</option>
                  <option value="tipo40">{t("science")}</option>
                  <option value="tipo41">{t("work")}</option>
                  <option value="tipo42">{t("telecommunications")}</option>
                  <option value="tipo43">{t("robot")}</option>
                  <option value="tipo44">{t("pharmaceutical")}</option>
                  <option value="tipo45">{t("foodandwater")}</option>
                  <option value="tipo46">{t("education")}</option>
                  <option value="tipo47">{t("humanlife")}</option>
                  <option value="tipo48">{t("publicadministration")}</option>
                  <option value="tipo49">{t("augmentedreality")}</option>
                  <option value="tipo50">{t("programming")}</option>
                  <option value="tipo51">{t("showbusiness")}</option>
                  <option value="tipo52">{t("automation")}</option>
                  <option value="tipo53">{t("tech")}</option>
                  <option value="tipo54">{t("emergingcountries")}</option>
                  <option value="tipo55">{t("businesssoftware")}</option>
                  <option value="tipo56">{t("manufacturing")}</option>
                  <option value="tipo57">{t("games")}</option>
                  <option value="tipo58">{t("music")}</option>
                  <option value="tipo59">{t("realestate")}</option>
                  <option value="tipo60">{t("investment")}</option>
                  <option value="tipo61">{t("educationaltechnology")}</option>
                  <option value="tipo62">{t("ionnovation")}</option>
                  <option value="tipo63">{t("credit")}</option>
                  <option value="tipo64">{t("insurance")}</option>
                  <option value="tipo65">{t("agriculturaltecno")}</option>
                  <option value="tipo66">{t("aerospace")}</option>
                  <option value="tipo67">{t("hitech")}</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel4">{t("dashrange")}</label>
                <select name="sel4" id="sel4">
                  <option value="0-25">0$ - 25$</option>
                  <option value="25-50">25$ - 50$</option>
                  <option value="50-100">50$ - 100$</option>
                  <option value="100-250">100$ - 250$</option>

                  <option value="250-500">250$ - 500$</option>
                  <option value="500-1000">500$ - 1000$</option>
                  <option value="1000>">1000$ &gt;</option>
                  {/*  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>*/}
                </select>
              </div>
              <div onClick={handleSearch} className="das-search-btn">
                <MdSearch />
              </div>
            </div>

            <form className="dash-sel-opt-content" style={{ margin: 0 }}>
              <label style={{ borderRadius: "2rem" }}>{t("dashorder")}</label>
              <div class="multiselect">
                <div class="selectBox" onClick={showCheckboxes}>
                  <select>
                    <option>{t("dashorder")}</option>
                  </select>
                  <div class="overSelect"></div>
                </div>
                <div id="checkboxes">
                  <label for="standard">
                    <input type="checkbox" id="standard" /> {t("dashoreder1")}
                  </label>
                  <label for="in-chiusura-di-tempo">
                    <input type="checkbox" id="in-chiusura-di-tempo" />
                    {t("dashoreder2")}
                  </label>
                  <label for="in-chiusura-d’investimento">
                    <input type="checkbox" id="in-chiusura-d’investimento" />
                    {t("dashoreder3")}
                  </label>
                  <label for="crescente">
                    <input type="checkbox" id="crescente" />
                    {t("dashoreder4")}
                  </label>
                  <label for="decrescente">
                    <input type="checkbox" id="decrescente" />
                    {t("dashoreder4")}
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="risul-ordino-box">
            <h2>
              {cards.length} {t("results")}
            </h2>
          </div>
          <div class="profile-dash-cards">{cards}</div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
