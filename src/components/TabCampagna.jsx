"use client"
import React, { useState } from 'react';
import BlogPost from "../components/PaginaCard/BlogPost";
import { useTranslation } from "../i18n/client";
import { ToastContainer, toast } from "react-toastify";
import { stakeProject, unstakeProject } from "../utils/firebase/writeInfos";

const TabCampagna = (props) => {
  const { t, i18n } = useTranslation();
  const [stakedValue, setStakedValue] = useState(0);
  const { progettiStakes, state } = props;

  const handleChange = (e) => {
    setStakedValue(e.target.value);
  };

  const stake = async () => {
    if (stakedValue > 0) {
      try {
        await toast.promise(stakeProject(props.address, stakedValue, t), {
          pending: t("confirm"),
          success: t("stakeDone"),
          error: t("error"),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unstake = async () => {
    try {
      await toast.promise(unstakeProject(props.address), {
        pending: t("confirm"),
        success: t("unstakeDone"),
        error: t("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pc-content-grid-left">
      <BlogPost heading={t("introduction")} text={props.introduzione} />
      <BlogPost heading={t("story")} text={props.storia} />
      <BlogPost heading="Vision" text={props.vision} />
      <h2>{t("stakeDptProject")}</h2>
      <input
        className="stakeInput"
        name={"stakeAmount"}
        value={stakedValue}
        onChange={handleChange}
        type="number"
        onWheel={(e) => e.target.blur()}
        placeholder={""}
      />
      <div className="button-container">
        <input className="grd-btn dopot-btn-sm" type="button" value="Stake" onClick={stake} />
        {state && (state === "Successful" || state === "Expired" || state === "Cancelled") && 
        <input style={{border:"0px"}} className="grd-btn dopot-btn-sm" type="button" value="Unstake All" onClick={unstake} />}
      </div>
      <div className="stakes">
      <h3>Stakes</h3>
      <ul>
        {progettiStakes && Array.isArray(progettiStakes) && progettiStakes.map((transaction, index) => (
          <li key={index}>
              <h5>
              <b>{transaction.amount} DPT</b>  {new Date(transaction.timestamp).toLocaleString()}
              </h5>
            </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TabCampagna;
