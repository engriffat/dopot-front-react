import React from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header";
import "../styles/components/header.css";
import "../styles/components/header.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopottoken.css";
import Footer from "../components/Footer";
import Ambassador_program from "../assets/img/Ambassador_program.png";

const Ambassador = () => {

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box">
          <div className="dopot-power">
            <h1 className="mb-5">{"Ambassador Program"}</h1>
            <img width={"100%"} src={Ambassador_program} alt="Ambassador program" />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Ambassador;
