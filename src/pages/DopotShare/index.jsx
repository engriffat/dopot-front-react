"use client"
import React from "react";
import Image from "next/image";
//import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const DopotShare = () => {

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          {/*<Header />*/}
        </div>
        <div className="box">
          <div className="dopot-power">
            <h1>SCOPRI I DUE TOKEN DI DOPOT</h1>

            {/* <div className="p-btn-box">
              <button
                style={{
                  border: "2px solid rgb(186, 178, 178)",
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                  boxShadow: "none",
                }}
                onClick={(e) => navigate("/dopottoken")}
                className="purple-border-btn dopot-btn-lg"
              >
                Dopot token
              </button>
              <button
                style={{
                  border: "2px solid rgb(186, 178, 178)",
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                }}
                className="grd-btn dopot-btn-lg"
              >
                Dopotshare
              </button>
            </div> */}
            <h2>DOPOTSHARE TOKEN: L`&apos;UTILITY TOKEN DELLA PIATTAFORMA</h2>
            <h3>
              DopotShare è il token della piattaforma, è un LP Token, con cui la
              gente potrà avere questi vantaggi:
            </h3>
            {/* <img className="p-hand-img" src={PHand2} alt="PHand1" /> */}

            <div className="p-cards-grid">
              <div className="p-card">
                <img src={"/assets/img/img-5.png"} alt="dopot meno commissioni" />
                <p>meno commissioni</p>
              </div>
              <div className="p-card">
                <img src={"/assets/img/img-6.png"} alt="dopot sicurezza" />
                <p>sicurezza</p>
              </div>
              <div className="p-card">
                <img src={"/assets/img/img-7.png"} alt="dopot velocità" />
                <p>velocità</p>
              </div>
              <div className="p-card">
                <img src={"/assets/img/img-8.png"} alt="dopot scaliabilita" />
                <p>scalabilità</p>
              </div>
            </div>
            <h3>Caratteristiche</h3>
            <ul>
              <li>
                Acquistare share tokens (depositare nel dao) burnare share
                tokens (prelevare e quindi vendere dal dao)
              </li>
              <li>
                Se si pagano le commissioni con DS token anziché in stablecoin,
                si avrà lo sconto del 50% dall`&apos;ammontare iniziale delle
                commissioni
              </li>
              <li>
                Se si raggiunge il minimo di goal del 51%, si potrà richiedere
                l`&apos;allungamento di 30 giorni del crowdfunding pagando l`&apos;1% della
                somma richiesta in DopotShare Token.
              </li>
            </ul>
          </div>
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
      </main>
    </div>
  );
};

export default DopotShare;
