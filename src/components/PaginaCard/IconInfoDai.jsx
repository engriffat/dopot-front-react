import React from "react";
import IconDai from "../../assets/img/dai.png";

const IconInfoDai = (props) => {
  return (
    <div className="pc-hero-icon-grid-card box-bk-over-logo">
      <img src={props.img} alt="Icon Info" />
      <p style={{ margin: 0 }}>
        {props.text}
        <img style={{ margin: 0, height: "20px" }} src={IconDai} alt="" />
        {props.text2}
        <span>
          <img style={{ width: "20%", margin: 0 }} src={IconDai} alt="" />
        </span>
        <span>raised</span>
      </p>
    </div>
  );
};

export default IconInfoDai;
