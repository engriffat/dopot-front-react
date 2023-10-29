import React, { useState } from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header";
import "../styles/components/header.css";
import "../styles/components/header.css";
import IconInfoCard from "../components/PaginaCard/IconInfoCard";
import PCDollarIcon from "../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../assets/img/pc-person-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdMenu, MdClear, MdSearch, MdFilterList } from "react-icons/md";
import LogoWhite from "../assets/img/logo-white.svg";
import DImg1 from "../assets/img/img-1.png";
import DImg2 from "../assets/img/img-2.png";
import DImg3 from "../assets/img/img-3.png";
import DImg4 from "../assets/img/img-4.png";
import DImg5 from "../assets/img/img-5.png";
import DImg6 from "../assets/img/img-6.png";
import DImg7 from "../assets/img/img-7.png";
import DImg8 from "../assets/img/img-8.png";
import PHand1 from "../assets/img/p-img-1.png";
import PHand2 from "../assets/img/p-img-2.png";
import PBottom from "../assets/img/pc-hero-img.png";
import "react-circular-progressbar/dist/styles.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopotpower.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const DopotPower = () => {
  let navigate = useNavigate();

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box" style={{textAlign: "center", maxWidth: "750px"}}>
          <div className="dopot-power">
            <h1>FAQ</h1>

            {
              <div className="p-btn-box">
                <button
                  style={{
                    borderRadius: "10px 10px 0 0",
                    padding: "8px 15px",
                    border: "2px solid rgb(186, 178, 178)",
                  }}
                  className="grd-btn dopot-btn-lg"
                >
                  Ita
                </button>

                <button
                  style={{
                    border: "2px solid rgb(186, 178, 178)",
                    borderRadius: "10px 10px 0 0",
                    padding: "8px 15px",
                    boxShadow: "none",
                  }}
                  onClick={(e) => navigate("/FaqEng")}
                  className="purple-border-btn dopot-btn-lg"
                >
                  Eng
                </button>
              </div>
            }
          </div>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/neIUbrXIFQM?si=dAjEIhSioIqEJmhu&amp;controls=0" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/MUWrB8CSEJ4?si=YpiR75R0tIMLj3bR&amp;controls=0" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <h1 className="text-center pb-5 mb-5 text-white">ALTRI IN ARRIVO...</h1>
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
        <Footer />
      </main>
    </div>
  );
};

export default DopotPower;
