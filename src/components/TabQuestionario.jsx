import React from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";

const TabQuestionario = (props) => {
  return (
    <div className="pc-content-grid-left">
      <h1>Domande Questionario</h1>
      <div className="div-sep"></div>
      <BlogPost
        heading=" State partendo in un mercato piccolo o in un mercato già ben
          strutturato?"
        text={props.progetto.domanda[0]}
      />
      <BlogPost
        heading="Avete il team giusto? Che competenze avete ?"
        text={props.progetto.domanda[1]}
      />
      <BlogPost
        heading="La vostra posizione di mercato sarà difendibile tra 10/20 anni? Se sí
          perché ?"
        text={props.progetto.domanda[2]}
      />
      <BlogPost
        heading=" Quale è la mission principale della tua azienda e quali obbiettivi
          principali ti sei posto?"
        text={props.progetto.domanda[3]}
      />
      <BlogPost
        heading="Che target di clienti fate riferimento?"
        text={props.progetto.domanda[4]}
      />
      <BlogPost
        heading="Cosa rende unico il tuo progetto?"
        text={props.progetto.domanda[5]}
      />
      <BlogPost
        heading="Quali sono i principali rischi per la startup?"
        text={props.progetto.domanda[6]}
      />
      <BlogPost
        heading="Quali sono le proiezioni triennali della startup?"
        text={props.progetto.domanda[7]}
      />
      <BlogPost
        heading="Il team presenta tutti i ruoli chiave per lo sviluppo?"
        text={props.progetto.domanda[8]}
      />
      <BlogPost
        heading="Come pensate di superare i vari rischi della startup?"
        text={props.progetto.domanda[9]}
      />
    </div>
  );
};

export default TabQuestionario;
