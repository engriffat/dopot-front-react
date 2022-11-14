import React from "react";

const InvestiCard = (props) => {
  return (
    <div className="investi-card">
      <img src={props.img} alt="BlogImg" />
      <div className="investi-card-box">
        <h3>{props.titolo}</h3>
      <p>
      {props.spec}
                  </p>
                  <br />
                  <p>- supply {props.supply}</p>
                  
                  <h5>{props.prezzo}€</h5>
        <button className="grd-btn dopot-btn-sm">Investi</button>
      </div>
    </div>
  );
};

export default InvestiCard;
