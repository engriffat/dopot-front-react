import React, { useEffect } from "react";
import gifLoading from "../assets/img/3yZR-unscreen.gif";
import "../styles/loading.css";
// import {DownloadProj} from "../utils/downloadProj";
import { downloadProjects } from "../utils/firebase/retriveInfo";
import { Routes, Route, useNavigate } from "react-router-dom";

function LoadingPage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const asyncFn = async () => {
      var status = await downloadProjects();
      if (status === true) {
        navigate("/dashboard");
      }
    };
    asyncFn();
  }, []);

  console.log("i fire once");

  return (
    <div style={{ background: "black" }}>
      <img src={gifLoading} alt="" srcset="" class="center" />
    </div>
  );
}

export default LoadingPage;
