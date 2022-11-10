import React from "react";

const InvestiCard = (props) => {
  return (
    <div className="investi-card">
      <img src={props.img} alt="BlogImg" />
      <div className="investi-card-box">
        <h6>{props.titolo}</h6>
      <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint dicta fugit sapiente minus fuga distinctio!
                  </p>
                  <br />
                  <p>- Feature 1</p>
                  <p>- Feature 2</p>
                  <p>- Feature 3</p>
                  <h5>$100</h5>
        <button className="grd-btn dopot-btn-sm">Investi</button>
      </div>
    </div>
  );
};

export default InvestiCard;
