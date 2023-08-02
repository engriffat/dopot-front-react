import React from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";
import { useTranslation } from "react-i18next";

const TabQuestionario = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="pc-content-grid-left">
      <h1>Domande Questionario</h1>
      <div className="div-sep"></div>
      <BlogPost heading={t("survey1")} text={props.progetto.domanda[0]} />
      <BlogPost heading={t("survey2")} text={props.progetto.domanda[1]} />
      <BlogPost heading={t("survey3")} text={props.progetto.domanda[2]} />
      <BlogPost heading={t("survey4")} text={props.progetto.domanda[3]} />
      <BlogPost heading={t("survey5")} text={props.progetto.domanda[4]} />
      <BlogPost heading={t("survey6")} text={props.progetto.domanda[5]} />
      <BlogPost heading={t("survey7")} text={props.progetto.domanda[6]} />
      <BlogPost heading={t("survey8")} text={props.progetto.domanda[7]} />
      <BlogPost heading={t("survey9")} text={props.progetto.domanda[8]} />
      <BlogPost heading={t("survey10")} text={props.progetto.domanda[9]} />
    </div>
  );
};

export default TabQuestionario;
