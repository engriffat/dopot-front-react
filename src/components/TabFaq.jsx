import React from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";
import { useTranslation } from "react-i18next";

const TabFaq = (props) => {
  console.dir(props);
  const { t, i18n } = useTranslation();
  return (
    <div className="pc-content-grid-left">
      <h1>{t("tabfaqh1")}</h1>
      <div className="div-sep"></div>
      <BlogPost
        heading={`${t("tabfaqquestion")} 1`}
        text={props.progetto.domanda1}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 2`}
        text={props.progetto.domanda2}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 3`}
        text={props.progetto.domanda3}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 4`}
        text={props.progetto.domanda4}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 5`}
        text={props.progetto.domanda5}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 6`}
        text={props.progetto.domanda6}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 7`}
        text={props.progetto.domanda7}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")}8`}
        text={props.progetto.domanda8}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 9`}
        text={props.progetto.domanda9}
      />
      <BlogPost
        heading={`${t("tabfaqquestion")} 10`}
        text={props.progetto.domanda10}
      />

      <h1>{t("tabfaqh1-2")}</h1>
      <div className="div-sep"></div>
      {props.progetto.titoloDomanda.map((titoloDomanda, i) => (
        <BlogPost
          heading={titoloDomanda}
          text={props.progetto.rispostaDomanda[i]}
        />
      ))}
    </div>
  );
};

export default TabFaq;
