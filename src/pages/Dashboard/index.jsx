"use client"
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "../../i18n/client.js";
import Header from "../../components/Header.jsx";
import { MdSearch, MdRefresh } from "react-icons/md";
import Card from "../../components/PaginaCard/Card.jsx";
import { progettiState, progettiImageState } from "../../recoilState.js";
import { getRecoil } from "recoil-nexus";
import Footer from "../../components/Footer.jsx";
import {
  downloadProjects,
  retriveFavorites,
  getInsuranceFunds
} from "../../utils/firebase/retriveInfo.jsx";
const { ethers } = require("ethers");



const Home = () => {
  const { t } = useTranslation();
  //const HandleSearch = useSearchForm();
  const [progettiFavourites, setProgettiFavourites] = useState([]);
  const [insuranceState, setInsuranceState] = useState(0);
  const [cards, setCards] = useState([]);
  const [reload, setReload] = useState(false);
  
  const load = useCallback(async () => {
    const cardsTemp = [];
    // await downloadProjects(t);
    const newData = await retriveFavorites();
    let insuranceFunds = await getInsuranceFunds();
    insuranceFunds = ethers.utils.formatEther(insuranceFunds.toString());
    if (insuranceFunds >= 1) insuranceFunds = insuranceFunds.substring(0, insuranceFunds.indexOf("."));
    setInsuranceState(insuranceFunds);
    setProgettiFavourites(newData);
    let progetti = getRecoil(progettiState);
    const query = new URLSearchParams(window ? window.location.search : "");
    const state = query.get("s") || "ongoing";
    const campaign = query.get("c") || "reward";
    const type = query.get("t") || "any";
    let value = query.get("v") || "any";

    //test
    let expanded = false;
    /*function showCheckboxes() {
      let checkboxes = document.getElementById("checkboxes");
      if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
      } else {
        checkboxes.style.display = "none";
        expanded = false;
      }
    }*/
    //test

    progetti = progetti.filter(
      (progetto) =>
        progetto.stateText?.toLowerCase().replace(" ", "") === state &&
        progetto.tipoCampagna === campaign &&
        (type !== "any" ? progetto.settore === type : true) &&
        (value !== "any"
          ? progetto.minInvestment >= parseInt(value.split("-")[0]) &&
            progetto.minInvestment <= parseInt(value.split("-")[1])
          : true)
    );
    if(state === "ongoing") progetti.sort((a, b) => b.totalStaked - a.totalStaked);

    progetti.forEach((element) => {
      cardsTemp.push(
        <Card
          progetto={element}
          progettiFavourites={progettiFavourites}
          immagini={getRecoil(progettiImageState)[element.address]}
          address={element.address}
          tier={element.tier}
        ></Card>
      );
    });
    setCards(cardsTemp);
  }, [progettiFavourites, t]);
  useEffect(() => {
    load();
  }, []);

  const HandleSearch = (e) => {
    //e.preventDefault(); // This prevents the default form submission behavior
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const stateSelect = document.querySelector("#sel1");
      const typeSelect = document.querySelector("#sel2");
      const categorySelect = document.querySelector("#sel3");
      const investmentSelect = document.querySelector("#sel4");
      const stateValue = stateSelect?.value;
      const typeValue = typeSelect?.value;
      const categoryValue = categorySelect?.value;
      const investmentValue = investmentSelect?.value;
      
      const newURL = new URL(window.location.href);
      if(stateValue) newURL.searchParams.set('s', stateValue);
      if(typeValue) newURL.searchParams.set('c', typeValue);
      if(categoryValue) newURL.searchParams.set('t', categoryValue);
      if(investmentValue) newURL.searchParams.set('v', investmentValue);
      window.history.pushState({ path: newURL.href }, '', newURL.href);
      //window.location.href = newURL;
      console.log("search param")
      setReload(!reload);
      load();
    }
}

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
                <label htmlFor="sel1">{t("dashlabel1")}</label>
                <select name="sel1" id="sel1">
                  <option value="ongoing">Live Crowdfounding</option>
                  <option value="successful">Closed Crowdfunding</option>
                  <option value="pendingapproval">Pending</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label htmlFor="sel2">{t("dashlabel2")}</label>
                <select name="sel2" id="sel2">
                  <option value="reward">Reward Crowdfounding</option>
                  <option value="equity">Equity</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label htmlFor="sel3">{t("dashlabel3")}</label>
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
                <label forhtml="sel4">{t("dashrange")}</label>
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
              <button onClick={HandleSearch} className="das-search-btn">
                <MdSearch />
              </button>
            </div> 
            <div onClick={load} className="das-refresh-btn">
              <MdRefresh />
            </div>
            {/*<form className="dash-sel-opt-content" style={{ margin: 0 }}>
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
            </form>*/}
          </div>
          <div className="risul-ordino-box">
            <h2>
              {cards.length} {t("results")}
            </h2>
          </div>
          <div className="profile-dash-cards">{cards}</div>
          <label style={{color: "white"}}>{t("insuranceFunds") + ": " + insuranceState + " DAI"}</label>
        </div>
      </main>
    </div>
  );
};

export default Home;
