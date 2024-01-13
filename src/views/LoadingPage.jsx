import React, { useState, useEffect } from "react";
import gifLoading from "../assets/img/3yZR-unscreen.gif";
import "../styles/loading.css";
// import {DownloadProj} from "../utils/downloadProj";
import { downloadProjects } from "../utils/firebase/retriveInfo";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoadingPage(props) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const loadingTexts = [t("loading1"),t("loading2"),t("loading3"),t("loading4")];
  const [currentText, setCurrentText] = useState(loadingTexts[0]);

  useEffect(() => {
    const asyncFn = async () => {
      var status = await downloadProjects();
      if (status === true) {
        navigate("/dashboard");
      }
    };
    asyncFn();
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Rotate through loading texts
      const currentIndex = loadingTexts.indexOf(currentText);
      const nextIndex = (currentIndex + 1) % loadingTexts.length;
      setCurrentText(loadingTexts[nextIndex]);
    }, 5 * 1000); // Change text every 1000 milliseconds (1 second)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentText, loadingTexts]);

  return (
    <div className="loadingDiv">
      <img src={gifLoading} alt="Loading" srcset="" />
      <h2>{currentText}</h2>
    </div>
  );
}

export default LoadingPage;
