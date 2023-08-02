import React from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";
import { useTranslation } from "react-i18next";

const Questionario = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="ins-input-box">
        <h1>{t("titlesurvey")}</h1>
        <h4>{t("survey1")}</h4>
        <textarea
          value={props.inputs.domanda1}
          onChange={props.handleChange}
          name="domanda1"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey2")}</h4>
        <textarea
          value={props.inputs.domanda2}
          onChange={props.handleChange}
          name="domanda2"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey3")}</h4>
        <textarea
          value={props.inputs.domanda3}
          onChange={props.handleChange}
          name="domanda3"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey4")}</h4>
        <textarea
          value={props.inputs.domanda4}
          onChange={props.handleChange}
          name="domanda4"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey5")}</h4>
        <textarea
          value={props.inputs.domanda5}
          onChange={props.handleChange}
          name="domanda5"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey6")}</h4>
        <textarea
          value={props.inputs.domanda6}
          onChange={props.handleChange}
          name="domanda6"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey7")}</h4>
        <textarea
          value={props.inputs.domanda7}
          onChange={props.handleChange}
          name="domanda7"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey8")}</h4>
        <textarea
          value={props.inputs.domanda8}
          onChange={props.handleChange}
          name="domanda8"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey9")}</h4>
        <textarea
          value={props.inputs.domanda9}
          onChange={props.handleChange}
          name="domanda9"
          placeholder={t("surveyp")}
        />

        <h4>{t("survey10")}</h4>
        <textarea
          value={props.inputs.domanda10}
          onChange={props.handleChange}
          name="domanda10"
          placeholder={t("surveyp")}
        />
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

const QuestionarioHeader = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-done">
          <p>{t("infobase")}</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-active">
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

export { Questionario, QuestionarioHeader };
