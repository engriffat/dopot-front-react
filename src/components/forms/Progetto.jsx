"use client"
import React, { useState } from "react";
import { useTranslation } from "../../i18n/client";

const Progetto = (props) => {
  const { t } = useTranslation();
  const [campagna, setcampagna] = useState("reward");
  const [giorniCampagna, setgiorniCampagna] = useState("45");
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

  function toggleCampagna(event) {
    setcampagna(event.target.name);
    const fevent = {
      target: { name: "tipoCampagna", value: event.target.name },
    };
    props.handleChange(fevent);
  }

  function toggleGiorniCampagna(event) {
    setgiorniCampagna(event.target.value);
    const fevent = {
      target: { name: "giorniCampagna", value: event.target.value },
    };
    props.handleChange(fevent);
  }

  return (
    <>
      <div className="ins-input-box">
        <h1>{t("projecth1")}</h1>
        <h4>{t("projecth4")}</h4>
        <div className="ins-btn-box">
          <button
            name="reward"
            onClick={toggleCampagna}
            className={
              campagna == "reward"
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            type="button"
          >
            {t("reward")}
          </button>
          {/*<button
            name="equity"
            onClick={toggleCampagna}
            className={
              campagna == "equity"
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            type="button"
          >
            Campagna Equity
          </button>*/}
        </div>
        <h6>{t("projecth6")}</h6>
      </div>
      <div className="ins-input-box">
        <h4>{t("projectquote")}</h4>
        <input
          name="quota"
          value={props.inputs.quota}
          onChange={props.handleChange}
          type="number"
          min="100"
          onWheel={(e) => e.target.blur()}
          placeholder={t("projectquotep")}
        />
      </div>
      <div className="ins-input-box">
        <h4>{t("projecttype")}</h4>
        <div className="ins-btn-box">
          <button
            value={"45"}
            className={
              giorniCampagna === "45"
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            onClick={toggleGiorniCampagna}
            type="button"
          >
            45 {t("days")}
          </button>
          <button
            value={"65"}
            className={
              giorniCampagna === "65"
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            onClick={toggleGiorniCampagna}
            type="button"
          >
            65 {t("days")}
          </button>
          <button
            value={"90"}
            className={
              giorniCampagna === "90"
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            onClick={toggleGiorniCampagna}
            type="button"
          >
            90 {t("days")}
          </button>
        </div>
      </div>
      <div className="ins-input-box">
        <h4>{t("projecttells")}</h4>
        <input
          name="descProgetto"
          value={props.inputs.descProgetto}
          onChange={props.handleChange}
          type="text"
          placeholder={t("projecttellsp")}
        />
      </div>
      <div className="ins-input-box">
        <h4>{t("projectobjective")}</h4>
        <input
          name="obbProgetto"
          value={props.inputs.obbProgetto}
          onChange={props.handleChange}
          type="text"
          placeholder={t("projectobjectivep")}
        />
      </div>
      <div className="ins-input-box">
        <h4>{t("projectteam")}</h4>
        <input
          name="team"
          value={props.inputs.team}
          onChange={props.handleChange}
          type="text"
          placeholder={t("projectteamp")}
        />
      </div>
      <div className="ins-input-box">
        <h4>Roadmap</h4>
        <div>
          <div className="container-plus">
            <input
              name="titoloRoadStep"
              onChange={(e) => props.handleChangeArray(e, 0)}
              type="text"
              placeholder={t("projecttitlestep")}
            />

            <button
              key="titoloRoadStepAdd"
              className="btn-plus-minus"
              onClick={handleAdd}
            >
              +
            </button>
          </div>
          <textarea
            name="descrRoadStep"
            onChange={(e) => props.handleChangeArray(e, 0)}
            placeholder={t("projectdescstep")}
          />
        </div>

        {val.map((data, i) => {
          return (
            <div key={"road" + i}>
              <div className="container-plus">
                <input
                  key={"titoloRoadStep" + i}
                  name={"titoloRoadStep"}
                  type="text"
                  onChange={(e) => props.handleChangeArray(e, i + 1)}
                  placeholder={t("projecttitlestep")}
                />
                <button
                  key={"titoloRoadStepDel" + i}
                  name={"titoloRoadStep.descrRoadStep"}
                  className="btn-plus-minus"
                  onClick={(e) => handleDelete(e, i + 1)}
                >
                  x
                </button>
              </div>
              <textarea
                key={"descrRoadStep" + i}
                name={"descrRoadStep"}
                onChange={(e) => props.handleChangeArray(e, i + 1)}
                placeholder={t("projectdescstep")}
              />
            </div>
          );
        })}

        {/* <input name="titoloRoadStep2" value={props.inputs.titoloRoadStep2} 
                onChange={props.handleChange} type="text" placeholder="inserisci titolo step" />
            <textarea name="descrRoadStep2" value={props.inputs.descrRoadStep2} 
                onChange={props.handleChange} placeholder="descrivi lo step della roadmap" /> */}
      </div>

      {(() => {
        if (props.setState != null) {
          return (
            <div className="add-btn-box">
              <a onClick={props.setState}>
                <img src={"/assets/img/plus-grd-icon.png"} alt="PlusGrdIcon" />
              </a>
            </div>
          );
        }
      })()}
    </>
  );
};

const ProgettoHeader = (props) => {
  const { t } = useTranslation();
  return (
    <div className="ins-progress">
      <div className="ins-circle ins-circle-done">
        <p>{t("infobase")}</p>
      </div>
      <div className="ins-line ins-line-done"></div>
      <div className="ins-circle ins-circle-done">
        <p>{t("survey")}</p>
      </div>
      <div className="ins-line ins-line-done"></div>
      <div className="ins-circle ins-circle-active">
        <p>{t("project")}</p>
      </div>
      <div className="ins-line ins-line-pending"></div>
      <div className="ins-circle ins-circle-pending">
        <p>{t("product")}</p>
      </div>
      <div className="ins-line ins-line-pending"></div>
      <div className="ins-circle ins-circle-pending">
        <p>NFTs Mint</p>
      </div>
      <div className="ins-line ins-line-pending"></div>
      <div className="ins-circle ins-circle-pending">
        <p>FAQ</p>
      </div>
    </div>
    
  );
};

export { Progetto, ProgettoHeader };
