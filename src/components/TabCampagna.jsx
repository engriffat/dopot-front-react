import React from "react";
import "../styles/components/footer.css";
import BlogPost from "../components/PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";
import { useTranslation } from "react-i18next";

const TabCampagna = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="pc-content-grid-left">
      <BlogPost heading={t("introduction")} text={props.introduzione} />
      <BlogPost heading={t("story")} text={props.storia} />
      <BlogPost heading="Vision" text={props.vision} />
    </div>
  );
};

export default TabCampagna;
