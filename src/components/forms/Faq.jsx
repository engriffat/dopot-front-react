import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";
import { useTranslation } from "react-i18next";

const Faq = (props) => {
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
    deletVal.splice(i - 1, 1);
    const result = e.target.name.match(/^([^.]+)[.]+([^.]+)$/);
    props.inputs[result[1]].splice(i, 1);
    props.inputs[result[2]].splice(i, 1);
    setVal(deletVal);
  };
  return (
    <>
      <div className="ins-input-box">
        <h1>{t("faqtitle")}</h1>
        <h4>{t("faqquestions")}</h4>
        <div>
          <div className="container-plus">
            <input
              name="titoloDomanda"
              onChange={(e) => props.handleChangeArray(e, 0)}
              type="text"
              placeholder={t("faq1p")}
            />

            <button
              key="titoloDomandaAdd"
              className="btn-plus-minus"
              onClick={handleAdd}
            >
              +
            </button>
          </div>
          <textarea
            name="rispostaDomanda"
            onChange={(e) => props.handleChangeArray(e, 0)}
            placeholder={t("faqresponsep")}
          />
        </div>
        {val.map((data, i) => {
          return (
            <div key={"titolo" + i}>
              <div className="container-plus">
                <input
                  key={"titoloDomanda" + i}
                  name={"titoloDomanda"}
                  type="text"
                  onChange={(e) => props.handleChangeArray(e, i + 1)}
                  placeholder={t("faqp")}
                />
                <button
                  key={"titoloDomandaDel" + i}
                  name={"titoloDomanda.rispostaDomanda"}
                  className="btn-plus-minus"
                  onClick={(e) => handleDelete(e, i + 1)}
                >
                  x
                </button>
              </div>
              <textarea
                key={"rispostaDomanda" + i}
                name={"rispostaDomanda"}
                placeholder={t("faqresponsep")}
                onChange={(e) => props.handleChangeArray(e, i + 1)}
              />
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

      <div className="proceed-btn-box">
        <p style={{fontSize: 15, alignSelf: 'center', marginRight: 10}}>Min ~0.0008 eth</p>
        <input className="grd-btn dopot-btn-lg" type="submit" />
      </div>
    </>
  );
};

const FaqHeader = (props) => {
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
        <div className="ins-circle ins-circle-done">
          <p>NFTs Mint</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-active">
          <p>FAQ</p>
        </div>
      </div>
    </>
  );
};

export { Faq, FaqHeader };
