import React from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";

const TabFaq = (props) => {
  return (
    <div className="pc-content-grid-left">
      <h1>Domande relativa azienda</h1>
      <div className="div-sep"></div>
      <BlogPost heading="Domanda 1" text={props.progetto.domanda1} />
      <BlogPost heading="Domanda 2" text={props.progetto.domanda2} />
      <BlogPost heading="Domanda 3" text={props.progetto.domanda3} />
      <BlogPost heading="Domanda 4" text={props.progetto.domanda4} />

      <h1>Domande relativa alla campagna di investimento</h1>
      <div className="div-sep"></div>
      <BlogPost
        heading={props.progetto.titoloDomanda1}
        text={props.progetto.rispostaDomanda1}
      />
      <BlogPost
        heading={props.progetto.titoloDomanda2}
        text={props.progetto.rispostaDomanda2}
      />
    </div>
  );
};

export default TabFaq;
