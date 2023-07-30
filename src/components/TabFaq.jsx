import React from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";

const TabFaq = (props) => { console.dir(props)
  return (
    <div className="pc-content-grid-left">
      <h1>Domande relativa azienda</h1>
      <div className="div-sep"></div>
      <BlogPost heading="Domanda 1" text={props.progetto.domanda1} />
      <BlogPost heading="Domanda 2" text={props.progetto.domanda2} />
      <BlogPost heading="Domanda 3" text={props.progetto.domanda3} />
      <BlogPost heading="Domanda 4" text={props.progetto.domanda4} />
      <BlogPost heading="Domanda 5" text={props.progetto.domanda5} />
      <BlogPost heading="Domanda 6" text={props.progetto.domanda6} />
      <BlogPost heading="Domanda 7" text={props.progetto.domanda7} />
      <BlogPost heading="Domanda 8" text={props.progetto.domanda8} />
      <BlogPost heading="Domanda 9" text={props.progetto.domanda9} />
      <BlogPost heading="Domanda 10" text={props.progetto.domanda10} />

      <h1>Domande relativa alla campagna di investimento</h1>
      <div className="div-sep"></div>
      {props.progetto.titoloDomanda.map((titoloDomanda, i) => 
        <BlogPost heading={titoloDomanda} text={props.progetto.rispostaDomanda[i]} />)
      }
    </div>
  );
};

export default TabFaq;
