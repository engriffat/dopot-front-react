import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

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
import { downloadProjects } from "../utils/firebase/retriveInfo";
import useSearchForm from "./useSearchForm";

const Home = () => {
  const handleSearch = useSearchForm();
  const cards = [];
  useEffect(() => {
    (async () => {
      await downloadProjects();
    })();
  });
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

  console.log(progetti);
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
        immagini={getRecoil(progettiImageState)[element.address]}
        address={element.addressContract}
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
                <label for="sel1">Seleziona lo stato del progetto</label>
                <select name="sel1" id="sel1">
                  <option value="ongoing">Live Crowdfounding</option>
                  <option value="successful">Closed Crowdfunding</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel2">Seleziona il tipo di progetto</label>
                <select name="sel2" id="sel2">
                  <option value="reward">Reward Crowdfounding</option>
                  <option value="equity">Equity</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel3">Seleziona la categoria</label>
                <select name="sel3" id="sel3">
                  <option selected value="any">
                    Any category
                  </option>
                  <option disabled value>
                    SOCIALE
                  </option>
                  <option value="tipo1">Assistenza sociale</option>
                  <option value="tipo2">Assistenza sanitaria</option>
                  <option value="tipo3">Assistenza socio-sanitaria</option>
                  <option value="tipo4">
                    Educazione-istruzione-formazione
                  </option>
                  <option value="tipo5">Tutela ambiente ed ecosistema</option>
                  <option value="tipo6">
                    Valorizzazione patrimonio culturale
                  </option>
                  <option value="tipo7">Turismo sociale</option>
                  <option value="tipo8">
                    Formazione universitaria-post universitaria
                  </option>
                  <option value="tipo9">formazione extra-scolastica</option>
                  <option value="tipo10">
                    Servizi strumentali alle imprese sociali
                  </option>
                  <option disabled value>
                    BLOCKCHAIN E INNOVAZIONE WEB3
                  </option>
                  <option value="tipo11">Blockchain in finanza e banche</option>
                  <option value="tipo12">Blockchain nelle assicurazioni</option>
                  <option value="tipo13">
                    Blockchain nei pagamenti digitali
                  </option>
                  <option value="tipo14">Blockchain nell'agrifood</option>
                  <option value="tipo15">Blockchain nell'industry 4.0</option>
                  <option value="tipo16">Blockchain nell' IoT</option>
                  <option value="tipo17">Blockchain nella sanità</option>
                  <option value="tipo18">
                    Blockchain nella pubblica amministrazione
                  </option>
                  <option value="tipo19">Blockchain nel retail</option>
                  <option value="tipo20">Blockchain nella musica</option>
                  <option value="tipo21">Blockchain in smart energy</option>
                  <option value="tipo22">Blockchain per unbanked</option>
                  <option value="tipo23">Crypto-Startup</option>
                  <option value="tipo24">Startup Decentralizzata</option>
                  <option value="tipo25">Progetto Decentralizzato</option>
                  <option disabled value>
                    CATEGORIE TRADIZIONALI
                  </option>
                  <option value="tipo26">Food startup</option>
                  <option value="tipo27">Fashion startup</option>
                  <option value="tipo28">Wear startup</option>
                  <option value="tipo29">Travel startup</option>
                  <option value="tipo30">Big data e internet app</option>
                  <option value="tipo31">Biotecnologie</option>
                  <option value="tipo32">Ecosostenibilità</option>
                  <option value="tipo33">Ingegneria</option>
                  <option value="tipo34">Mobile e smartphone</option>
                  <option value="tipo35">Modellazione 3D</option>
                  <option value="tipo36">Ricerca e sviluppo</option>
                  <option value="tipo37">Software e internet delle cose</option>
                  <option value="tipo38">Energia</option>
                  <option value="tipo39">Intelligenza artificiale</option>
                  <option value="tipo40">Scienza e trasporti</option>
                  <option value="tipo41">Lavoro</option>
                  <option value="tipo42">Telecomunicazioni</option>
                  <option value="tipo43">Robot</option>
                  <option value="tipo44">Farmaceutica</option>
                  <option value="tipo45">Cibo e acqua</option>
                  <option value="tipo46">Educazione</option>
                  <option value="tipo47">Miglioramento della vita umana</option>
                  <option value="tipo48">Pubblica amministrazione</option>
                  <option value="tipo49">Realtà aumentata</option>
                  <option value="tipo50">Programmazione</option>
                  <option value="tipo51">Show business</option>
                  <option value="tipo52">Automazione</option>
                  <option value="tipo53">Tech per ogni età e popolo</option>
                  <option value="tipo54">Paesi emergenti</option>
                  <option value="tipo55">Software aziendali</option>
                  <option value="tipo56">Telecomunicazioni</option>
                  <option value="tipo57">Manufatturiero</option>
                  <option value="tipo58">Giochi</option>
                  <option value="tipo59">Musica</option>
                  <option value="tipo60">Immobiliare</option>
                  <option value="tipo61">Investimento</option>
                  <option value="tipo62">Tecnologia educativa</option>
                  <option value="tipo63">Innovazione</option>
                  <option value="tipo64">Credito</option>
                  <option value="tipo65">Assicurazione</option>
                  <option value="tipo66">Agricultural technology</option>
                  <option value="tipo67">Aerospaziale</option>
                  <option value="tipo68">Hi-tech</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel4">Range di investimento</label>
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
              <label style={{ borderRadius: "2rem" }}>Ordina</label>
              <div class="multiselect">
                <div class="selectBox" onClick={showCheckboxes}>
                  <select>
                    <option>Ordina</option>
                  </select>
                  <div class="overSelect"></div>
                </div>
                <div id="checkboxes">
                  <label for="standard">
                    <input type="checkbox" id="standard" /> Standard
                  </label>
                  <label for="in-chiusura-di-tempo">
                    <input type="checkbox" id="in-chiusura-di-tempo" />
                    In chiusura di tempo
                  </label>
                  <label for="in-chiusura-d’investimento">
                    <input type="checkbox" id="in-chiusura-d’investimento" />
                    In chiusura d’investimento
                  </label>
                  <label for="crescente">
                    <input type="checkbox" id="crescente" />
                    Crescente
                  </label>
                  <label for="decrescente">
                    <input type="checkbox" id="decrescente" />
                    Decrescente
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="risul-ordino-box">
            <h2>{cards.length} Risultati</h2>
          </div>
          <div class="profile-dash-cards">{cards}</div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
