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
