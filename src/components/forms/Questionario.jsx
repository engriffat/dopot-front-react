import React from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const Questionario = (props) => {
  return (
    <>
      <div className="ins-input-box">
        <h1>Questionario</h1>
        <h4>
          State partendo in un mercato piccolo o in un mercato già ben
          strutturato?
        </h4>
        <textarea
          value={props.inputs.domanda1 || ""}
          onChange={props.handleChange}
          name="domanda1"
          placeholder="inserisci la risposta"
        />

        <h4>Avete il team giusto? Che competenze avete ?</h4>
        <textarea
          value={props.inputs.domanda2 || ""}
          onChange={props.handleChange}
          name="domanda2"
          placeholder="inserisci la risposta"
        />

        <h4>
          La vostra posizione di mercato sarà difendibile tra 10/20 anni? Se sí
          perché ?
        </h4>
        <textarea
          value={props.inputs.domanda3 || ""}
          onChange={props.handleChange}
          name="domanda3"
          placeholder="inserisci la risposta"
        />

        <h4>
          Quale è la mission principale della tua azienda e quali obbiettivi
          principali ti sei posto?
        </h4>
        <textarea
          value={props.inputs.domanda4 || ""}
          onChange={props.handleChange}
          name="domanda4"
          placeholder="inserisci la risposta"
        />

        <h4>Che target di clienti fate riferimento?</h4>
        <textarea
          value={props.inputs.domanda5 || ""}
          onChange={props.handleChange}
          name="domanda5"
          placeholder="inserisci la risposta"
        />

        <h4>Cosa rende unico il tuo progetto?</h4>
        <textarea
          value={props.inputs.domanda6 || ""}
          onChange={props.handleChange}
          name="domanda6"
          placeholder="inserisci la risposta"
        />

        <h4>Quali sono i principali rischi per la startup?</h4>
        <textarea
          value={props.inputs.domanda7 || ""}
          onChange={props.handleChange}
          name="domanda7"
          placeholder="inserisci la risposta"
        />

        <h4>Quali sono le proiezioni triennali della startup?</h4>
        <textarea
          value={props.inputs.domanda8 || ""}
          onChange={props.handleChange}
          name="domanda8"
          placeholder="inserisci la risposta"
        />

        <h4>Il team presenta tutti i ruoli chiave per lo sviluppo?</h4>
        <textarea
          value={props.inputs.domanda9 || ""}
          onChange={props.handleChange}
          name="domanda9"
          placeholder="inserisci la risposta"
        />

        <h4>Come pensate di superare i vari rischi della startup?</h4>
        <textarea
          value={props.inputs.domanda10 || ""}
          onChange={props.handleChange}
          name="domanda10"
          placeholder="inserisci la risposta"
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
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-done">
          <p>Informazioni di base</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-active">
          <p>Questionario</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>Progetto</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>Prodotto</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>Nft Mint</p>
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
