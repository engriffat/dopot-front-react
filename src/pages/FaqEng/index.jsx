"use client"
import React from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useRouter } from "next/router"; // Import useRouter

const DopotShare = () => {
  const router = useRouter(); // Initialize useRouter

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box" style={{textAlign: "center", maxWidth: "750px"}}>
          <div className="dopot-power">
            <h1>Tutorials</h1>

            <div className="p-btn-box">
              <button
                style={{
                  border: "2px solid rgb(186, 178, 178)",
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                  boxShadow: "none",
                }}
                onClick={(e) => router.push("/FaqIta")}
                className="purple-border-btn dopot-btn-lg"
              >
                Ita
              </button>
              <button
                style={{
                  border: "2px solid rgb(186, 178, 178)",
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                }}
                className="grd-btn dopot-btn-lg"
              >
                Eng
              </button>
            </div>
          </div>
          {/* 
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/6LJEa0nVHwM?si=Wpb7qapoZJUtU2_z" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/-G0NO1gIraY?si=4XnZburzW6FYAOGk" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/f2maZyjzeaU?si=ZPwqP8U8h_k5a63F" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/LFIMHsv41bQ?si=h1K2Qhd_JeeZMpmr" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/EV8UQ6qrKSk?si=56EPFlPHKlMLbDF3" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/gT8bpUQ6hsc?si=vOCv8B1T5S3e3ARM" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>
          <p>
            <iframe width="100%" height="250" src="https://www.youtube-nocookie.com/embed/bPraP1eXWIs?si=c2B-XCqhWhJF9ylE" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </p>*/}
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
      </main>
    </div>
  );
};

export default DopotShare;
