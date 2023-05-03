import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const NftMint = (props) => {
  const [val, setVal] = useState([]);
  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (i) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };
  return (
    <>
      <div className="ins-input-box">
        <h1>Carica le immagini del tuo NFT</h1>
        <div>
          <div className="container-plus">
            <input
              name="imageNftDef"
              onChange={props.handleChange}
              type="file"
              placeholder="Scrivi la prima domanda"
            />

            <button
              style={{ marginTop: "0.9%", marginBottom: "0.9%" }}
              className="btn-plus-minus"
              onClick={() => handleAdd()}
            >
              +
            </button>
          </div>
        </div>
        {val.map((data, i) => {
          return (
            <div>
              <div className="container-plus">
                <input
                  name={"imageNftDef" + i}
                  type="file"
                  value={data}
                  onChange={(e) => handleChange(e, i)}
                />
                <button
                  style={{ marginTop: "0.9%", marginBottom: "0.9%" }}
                  className="btn-plus-minus"
                  onClick={() => handleDelete(i)}
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {(() => {
        if (props.setState != null) {
          return (
            <div className="add-btn-box">
              <a onClick={props.setState}>
                <img src={PlusGrdIcon} alt="PlusGrdIcon" />
              </a>
            </div>
          );
        }
      })()}
    </>
  );
};

const NftMintHeader = (props) => {
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-done">
          <p>Informazioni di base</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Questionario</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Progetto</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Prodotto</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-active">
          <p>Nft Mint</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>FAQ</p>
        </div>
      </div>
    </>
  );
};

export { NftMint, NftMintHeader };
