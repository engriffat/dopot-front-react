import React from "react";

const IconInfoCard = (props) => {
  const {text, img, investors} = props;

  const handleInvestorsSelectChange = (event) => {
    const selectedAddress = event.target.value;
    if(selectedAddress !== "default") window.open(`https://app.proofofhumanity.id/profile/${selectedAddress}`, '_blank');
  };

  return investors ? 
  <div className="pc-hero-icon-grid-card box-bk-over-logo">
      <img src={img} alt="Icon Info" />
      <div style={{maxWidth: '150px'}} className="dash-sel-opt-content">
        <select style={{maxWidth: '100%'}} name="selInvestors" id="selInvestors" onChange={handleInvestorsSelectChange}>
        <option value={"default"}>{text}</option>
        {investors && Object.keys(investors).map((key) => (
            <option value={key}>{key}</option>
          ))}
        </select>
      </div>
    </div>
    
   : 

    <div className="pc-hero-icon-grid-card box-bk-over-logo">
      <img src={img} alt="Icon Info" />
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  ;
};

export default IconInfoCard;
