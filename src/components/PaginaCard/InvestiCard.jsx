import React from "react";
import { addInvestment } from "../../utils/firebase/writeInfos";

const InvestiCard = (props) => {
  return (
    <div className="investi-card">
      <input type="checkbox" id="click-invest" />
      <label for="click-invest" style={{ cursor: "pointer", display: "block" }}>
        <img src={props.img} alt="BlogImg" />

        <div className="investi-card-box">
          <h3 className="box-bk-over-logo">{props.titolo}</h3>
          <p className="box-bk-over-logo">{props.spec}</p>
          <br />
          <p className="box-bk-over-logo">- supply {props.supply}</p>

          <h5>{props.prezzo}€</h5>
          <button
            onClick={() => addInvestment(props.address, props.numTier)}
            className="grd-btn dopot-btn-sm"
          >
            Investi
          </button>
        </div>
      </label>

      <div class="content-invest ">
        <img src={props.img} alt="BlogImg" />
        <div class="text-invest">
          <h3 className="box-bk-over-logo">{props.titolo}</h3>
          <p className="box-bk-over-logo">{props.spec}</p>
          <br />
          <p className="box-bk-over-logo">- supply {props.supply}</p>

          <h5>{props.prezzo}€</h5>
          <button
            onClick={() => addInvestment(props.address, props.numTier)}
            className="grd-btn dopot-btn-sm"
          >
            Investi
          </button>
        </div>
        <label for="click-invest" id="temp-invest">
          x
        </label>
      </div>
    </div>
  );
};

export default InvestiCard;
