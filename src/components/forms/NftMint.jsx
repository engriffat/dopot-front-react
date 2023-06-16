import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const NftMint = (props) => {
  const [val, setVal] = useState([]);
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (e, i) => {
    e.preventDefault();
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };
  return (
    <>
      <div className="ins-input-box">
        <h1>Carica l'immagine per NFT del prodotto</h1>
        <div>
          <div className="container-plus">
            <input
              name="imageNftDef"
              onChange={(e) => props.handleChangeNft(e, props.nProdotto-1)}
              type="file"
              placeholder="Scrivi la prima domanda"
              accept=".png,.jpg,.jpeg"
            />
          </div>
        </div>
      </div>
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
          <p>NFTs Mint</p>
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
