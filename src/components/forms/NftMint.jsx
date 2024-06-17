import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";
import { useTranslation } from "react-i18next";

const NftMint = (props) => {
  const { t, i18n } = useTranslation();
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
        <h1>{t("nftmintimagetitle")}</h1>
        <div>
          <div className="container-plus">
            <input
              name="imageNftDef"
              onChange={(e) => props.handleChangeNft(e, props.nProdotto - 1)}
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
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-done">
          <p>{t("infobase")}</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>{t("survey")}</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>{t("project")}</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>{t("product")}</p>
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
