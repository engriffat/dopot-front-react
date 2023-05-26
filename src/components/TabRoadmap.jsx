import React from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";

const TabRoadmap = (props) => {
  return (
    <div className="pc-content-grid-left">
      <h1>Roadmap</h1>
      <div className="div-sep"></div>
      <BlogPost heading={props.titoloRoadStep1} text={props.descrRoadStep1} />
      <BlogPost heading={props.titoloRoadStep2} text={props.descrRoadStep2} />
    </div>
  );
};

export default TabRoadmap;
