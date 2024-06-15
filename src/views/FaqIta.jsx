import React from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header";
import "../styles/components/header.css";
import "react-circular-progressbar/dist/styles.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopottoken.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const DopotToken = () => {
  let navigate = useNavigate();

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box" style={{textAlign: "center", maxWidth: "750px"}}>
          <div className="dopot-power">
            <h1>Tutorials</h1>

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
          {/* 
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/neIUbrXIFQM?si=dAjEIhSioIqEJmhu" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/MUWrB8CSEJ4?si=YpiR75R0tIMLj3bR" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/Mk5sAVforu4?si=mprGSlWUimcC9VGU" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/KxyqSPh8DBc?si=GgPcElNTdRLLsh_0" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/u0-Dgd9Ytac?si=58Z3OJwCjfjz0nW0" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/pJITJigNwzc?si=3EfQaOg4GwtY63fO" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/P2fESTmoG8w?si=7gUBZ9mzJX5ikjJv" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>*/}
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
        <Footer />
      </main>
    </div>
  );
};

export default DopotToken;
