import React, { useEffect, useState } from 'react';
import { addInvestment } from "../../utils/firebase/writeInfos";
import addressDopotReward from '../../abi/dopotReward/address.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";


const InvestiCard = (props) => {
  const { state, titolo, price, spec, currentSupply, supply } = props;
  let { img } = props;
  const { t } = useTranslation();
  async function invest(){
    try {
      await toast.promise(addInvestment(props.address, props.numTier, price, titolo, t), {
        pending: t("confirm"),
        success: t("invested"),
        error: t("error"),
      });
    } catch (error) {
      console.log(error);
    }
    
  }
  const [imageSrc, setImageSrc] = useState(null);
  const binaryString = img;

  useEffect(() => {
    if (!binaryString) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(binaryString); 
    reader.onloadend = function() {
      var base64data = reader.result;                
      setImageSrc(base64data);
    }    
  }, [binaryString]);
  

  return (
    <div className="investi-card">
      <input type="checkbox" id="click-invest" />
      <label htmlFor="click-invest" style={{ cursor: "pointer", display: "block" }}>
      {imageSrc && <img src={imageSrc} alt="" />}

        <div className="investi-card-box">
          <h3 className="box-bk-over-logo">{titolo}</h3>
          <p className="box-bk-over-logo">{spec}</p>
          <br />
          <p className="box-bk-over-logo">{currentSupply}/{supply} supply</p>

          <h5>{"DAI " + price}</h5>
          <button
            onClick={() => (state === "Ongoing" ? invest() : window.location.href = (`https://testnets.opensea.io/assets/mumbai/${addressDopotReward}`))}
            className="grd-btn dopot-btn-sm"
          >
            {state === "Ongoing" ? "Invest" : "Buy NFT"}
          </button>
        </div>
      </label>

      <div className="content-invest ">
        <img src={imageSrc} alt="BlogImg" />
        <div className="text-invest">
          <h3 className="box-bk-over-logo">{titolo}</h3>
          <p className="box-bk-over-logo">{spec}</p>
          <br />
          <p className="box-bk-over-logo">{currentSupply}/{supply} supply</p>

          <h5>{"DAI " + price}</h5>
          <button
            onClick={() => (state === "Ongoing" ? invest() : window.location.href = (`https://testnets.opensea.io/assets/mumbai/${addressDopotReward}`))}
            className="grd-btn dopot-btn-sm"
          >
            {state === "Ongoing" ? "Invest" : "Buy NFT"}
          </button>
        </div>
        <label for="click-invest" id="temp-invest">
          x
        </label>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InvestiCard;
