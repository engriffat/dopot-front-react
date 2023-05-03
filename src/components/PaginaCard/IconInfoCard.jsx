import React from "react";

const IconInfoCard = (props) => {
  return (
    <div className="pc-hero-icon-grid-card box-bk-over-logo">
      <img src={props.img} alt="Icon Info" />
      <p style={{ margin: 0 }}>{props.text}</p>
    </div>
  );
};

export default IconInfoCard;
