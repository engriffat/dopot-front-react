import React, { useState } from "react";
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

const Home = () => {
  const cards = [];
  getRecoil(progettiState).forEach((element) => {
    cards.push(
      <Card
        progetto={element}
        immagini={getRecoil(progettiImageState)[element.address]}
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
                <label for="sel1">Seleziona il tipo di progetto</label>
                <select name="sel1" id="sel1">
                  <option value="volvo">Live Crowdfounding</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel2">Seleziona il tipo di progetto</label>
                <select name="sel2" id="sel2">
                  <option value="volvo">Reward Crowdfounding</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel3">Seleziona la categoria</label>
                <select name="sel3" id="sel3">
                  <option value="volvo">Gaming</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="dash-sel-opt-content">
                <label for="sel4">Range di investimento</label>
                <select name="sel4" id="sel4">
                  <option value="volvo">10$ - 1000$</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="das-search-btn">
                <MdSearch />
              </div>
            </div>
            <div className="dashboard-btn">
              <button>
                <MdFilterList /> Filter
              </button>
            </div>
          </div>
          <div className="risul-ordino-box">
            <h2>{cards.length} Risultati</h2>
            <h6>ordina</h6>
          </div>
          <div class="profile-dash-cards">{cards}</div>
        </div>
      </main>
    </div>
  );
};

export default Home;
