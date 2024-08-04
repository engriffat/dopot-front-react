/* eslint-disable react/jsx-key */
"use client"
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "../../i18n/client";

const InfBase = ({inputs, handleChange, handleCountryChange, handleChangeArray, setState, }) => {
  const { t, i18n } = useTranslation();
  const [val, setVal] = useState([]);
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...val, []];
    setVal(abc);
  };

  const handleDelete = (e, i) => {
    e.preventDefault();
    const deletVal = [...val];
    deletVal.splice(i - 1, 1);
    inputs[e.target.name].splice(i, 1);
    setVal(deletVal);
  };
  //val 2
  const [val2, setVal2] = useState([]);
  const handleAdd2 = (e) => {
    e.preventDefault();
    const abc2 = [...val2, []];
    setVal2(abc2);
  };
  const handleChange2 = (onChangeValue, i) => {
    const inputdata2 = [...val2];
    inputdata2[i] = onChangeValue.target.value;
    setVal2(inputdata2);
  };
  const handleDelete2 = (e, i) => {
    e.preventDefault();
    const deletVal2 = [...val2];
    deletVal2.splice(i, 1);
    setVal2(deletVal2);
  };

  return (
    <>
      <div className="ins-input-box">
        <h1>{t("infbaseh1")}</h1>
        <h4>{t("infbasename")}</h4>
        <input
          type="text"
          name="nomeAzienda"
          value={inputs.nomeAzienda}
          onChange={handleChange}
          placeholder={t("infbasenamep")}
        />
      </div>
      <div className="ins-input-box">
        <h4>{t("infbasenation")}</h4>
        <ReactFlagsSelect
          className="nazioneAziendaSelect"
          selected={inputs.nazioneAzienda}
          onSelect={handleCountryChange}
          searchable
        />
        ;
      </div>
      <div className="ins-input-box">
        <h4>{t("infbasesector")}</h4>
        <select name="settore" onChange={handleChange}>
          <option disabled selected value>
            {t("selectcateg")}
          </option>
          <option disabled value>
            {t("social")}
          </option>
          <option value="tipo1"> {t("socialcare")}</option>
          <option value="tipo2"> {t("healthcare")}</option>
          <option value="tipo3"> {t("socialhealthass")}</option>
          <option value="tipo4"> {t("educationtraining")}</option>
          <option value="tipo5"> {t("environmental")}</option>
          <option value="tipo6"> {t("enhancementcultural")}</option>
          <option value="tipo7"> {t("socialtourism")}</option>
          <option value="tipo8">{t("universitypost")}</option>
          <option value="tipo9"> {t("extracurricular")}</option>
          <option value="tipo10">{t("socialenterprises")}</option>
          <option disabled value>
            {t("blockchain")}
          </option>
          <option value="tipo11">{t("blockchainfinance")}</option>
          <option value="tipo12">{t("blockchaininsurance")}</option>
          <option value="tipo13">{t("blockchainpaydigital")}</option>
          <option value="tipo14">{t("blockchainagrifood")}</option>
          <option value="tipo15">{t("blockchain4.0")}</option>
          <option value="tipo16">{t("blockchainiot")}</option>
          <option value="tipo17">{t("blockchainhealthcare")}</option>
          <option value="tipo18">{t("blockchainadministration")}</option>
          <option value="tipo19">{t("blockchainretail")}</option>
          <option value="tipo20">{t("blockchainmusic")}</option>
          <option value="tipo21">{t("blockchainsmartenergy")}</option>
          <option value="tipo22">{t("blockchainunbanked")}</option>
          <option value="tipo23">{t("cryptostartup")}</option>
          <option value="tipo24">{t("decentralizedstartup")}</option>
          <option value="tipo25">{t("decentralizedproject")}</option>
          <option disabled value>
            {t("traditional")}
          </option>
          <option value="tipo26"> {t("foodstartup")}</option>
          <option value="tipo27"> {t("fashionstartup")}</option>
          <option value="tipo28"> {t("wearstartup")}</option>
          <option value="tipo29"> {t("travelstartup")}</option>
          <option value="tipo30"> {t("bigdata")}</option>
          <option value="tipo31"> {t("biotechnology")}</option>
          <option value="tipo32"> {t("ecosustainability")}</option>
          <option value="tipo33"> {t("engineering")}</option>
          <option value="tipo34"> {t("mobile")}</option>
          <option value="tipo35"> {t("modelling")}</option>
          <option value="tipo36"> {t("research")}</option>
          <option value="tipo37"> {t("software")}</option>
          <option value="tipo38"> {t("power")}</option>
          <option value="tipo39"> {t("artificialintelligence")}</option>
          <option value="tipo40"> {t("science")}</option>
          <option value="tipo41"> {t("work")}</option>
          <option value="tipo42"> {t("telecommunications")}</option>
          <option value="tipo43"> {t("robot")}</option>
          <option value="tipo44"> {t("pharmaceutical")}</option>
          <option value="tipo45"> {t("foodandwater")}</option>
          <option value="tipo46"> {t("education")}</option>
          <option value="tipo47"> {t("humanlife")}</option>
          <option value="tipo48"> {t("publicadministration")}</option>
          <option value="tipo49"> {t("augmentedreality")}</option>
          <option value="tipo50"> {t("programming")}</option>
          <option value="tipo51"> {t("showbusiness")}</option>
          <option value="tipo52"> {t("automation")}</option>
          <option value="tipo53"> {t("tech")}</option>
          <option value="tipo54"> {t("emergingcountries")}</option>
          <option value="tipo55"> {t("businesssoftware")}</option>
          <option value="tipo57"> {t("manufacturing")}</option>
          <option value="tipo58"> {t("games")}</option>
          <option value="tipo59"> {t("music")}</option>
          <option value="tipo60"> {t("realestate")}</option>
          <option value="tipo61"> {t("investment")}</option>
          <option value="tipo62"> {t("educationaltechnology")}</option>
          <option value="tipo63"> {t("ionnovation")}</option>
          <option value="tipo64"> {t("credit")}</option>
          <option value="tipo65"> {t("insurance")}</option>
          <option value="tipo66"> {t("agriculturaltecno")}</option>
          <option value="tipo67"> {t("aerospace")}</option>
          <option value="tipo68"> {t("hitech")}</option>
        </select>
      </div>
      <div className="ins-input-box">
        <h4>Logo</h4>
        <input
          key="logoAzienda"
          name="logoAzienda"
          value={inputs.logoAzienda}
          onChange={handleChange}
          type="file"
          accept=".png,.jpg,.jpeg"
        />
      </div>
      <div className="ins-input-box">
        <h4>{t("projectdesc")}</h4>
        <textarea
          name="descrizione"
          value={inputs.descrizione}
          onChange={handleChange}
          type="textarea"
          placeholder={t("projectdescp")}
        />
      </div>
      <div className="ins-input-box">
        <h4>{t("vatnumber")}</h4>
        <input
          name="pIva"
          value={inputs.pIva}
          onChange={handleChange}
          type="text"
          placeholder={t("vatnumberp")}
        />
      </div>
      <div className="ins-input-box">
        <h4>{t("website")}</h4>
        <input
          name="sito"
          value={inputs.sito || ""}
          onChange={handleChange}
          type="text"
          placeholder={t("websitep")}
        />
      </div>
      <div className="ins-input-box ">
        <h4>Social Media </h4>
        <div className="container-plus">
          <input
            name="socialMedia"
            type="text"
            onChange={(e) => handleChangeArray(e, 0)}
            placeholder={t("socialmediap")}
          />

          <button className="btn-plus-minus" onClick={(e) => handleAdd(e)}>
            +
          </button>
        </div>
        {val.map((data, i) => {
          return (
            <div className="container-plus">
              <input
                name={"socialMedia"}
                type="text"
                placeholder={t("socialmediap")}
                onChange={(e) => handleChangeArray(e, i + 1)}
              />
              <button
                className="btn-plus-minus"
                name={"socialMedia"}
                onClick={(e) => handleDelete(e, i + 1)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      <div className="ins-input-box">
        <h4>{t("companydocumentation")}</h4>
        <div className="container-plus">
          <input
            name="documentazione"
            accept=".pdf"
            type="file"
            onChange={handleChange}
            multiple
            placeholder="trascina il o
                clicca per inserirlo
                (.pdf)"
          />
        </div>
      </div>

      <div className="ins-input-box">
        <h4>{t("introduction")}</h4>
        <textarea
          value={inputs.introduzione}
          onChange={handleChange}
          name="introduzione"
          placeholder={t("introductionp")}
        />
        {/* <div className="ins-input-box">
          <h4>Immagine Introduzione </h4>
          <input
            name="fotoIntro"
            value={inputs.fotoIntro}
            onChange={handleChange}
            type="file"
          />
        </div> */}
        <h4>{t("story")}</h4>
        <textarea
          value={inputs.storia}
          onChange={handleChange}
          name="storia"
          placeholder={t("storyp")}
        />
        {/* <div className="ins-input-box">
          <h4>Immagine Introduzione </h4>
          <input
            name="fotoStoria"
            value={inputs.fotoStoria}
            onChange={handleChange}
            type="file"
          />
        </div> */}

        <h4>{t("vision")}</h4>
        <textarea
          value={inputs.vision}
          onChange={handleChange}
          name="vision"
          placeholder={t("visionp")}
        />
        {/* <div className="ins-input-box">
          <h4>Immagine Introduzione </h4>
          <input
            name="fotoVision"
            value={inputs.fotoVision}
            onChange={handleChange}
            type="file"
          />
        </div> */}
      </div>
      {(() => {
        if (setState != null) {
          return (
            <div className="add-btn-box">
              <a onClick={setState}>
                <img src={"/assets/img/plus-grd-icon.png"} alt="PlusGrdIcon" />
              </a>
            </div>
          );
        }
      })()}
    </>
  );
};

const InfBaseHeader = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-active">
          <p>{t("infobase")}</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>{t("survey")}</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
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
    </>
  );
};

export { InfBase, InfBaseHeader };
