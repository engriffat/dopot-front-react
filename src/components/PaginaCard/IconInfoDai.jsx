"use client"
import React from "react";
import { useTranslation } from "../../i18n/client";

const IconInfoDai = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="pc-hero-icon-grid-card box-bk-over-logo">
      <img src={props.img} alt="Icon Info" />
      <p style={{ margin: 0 }}>
        {props.text}
        <img style={{ margin: 0, height: "20px" }} src={"/assets/img/dai.png"} alt="" />
        {props.text2}
        <span>
          <img style={{ margin: 0, height: "20px" }} src={"/assets/img/dai.png"} alt="" />
        </span>
        <span>{t("raised")}</span>
      </p>
    </div>
  );
};

export default IconInfoDai;
