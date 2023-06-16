import React from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const Intro = (props) => {
    return(<><div className="ins-input-box">
    <h4>Introduzione</h4>
    <textarea  value={props.inputs.domanda1} 
        onChange={props.handleChange} name="domanda1" placeholder="inserisci un introduzione" />

        <h4>Logo</h4>
        <input
            name="logoAzienda" value={props.inputs.logoAzienda} 
            onChange={props.handleChange}
            type="file"
            accept=".png,.jpg,.jpeg"
        />

    <h4>Storia</h4>
    <textarea value={props.inputs.domanda2} 
        onChange={props.handleChange} name="domanda2" placeholder="inserisci la storia della tua azienda" />
    
    <h4>Vision</h4>
    <textarea value={props.inputs.domanda3} 
        onChange={props.handleChange} name="domanda3" placeholder="inserisci la vision della vostra azienda" />

    
</div>
        {(() => {
        if (props.setState != null ) {
          return (
            <div className="add-btn-box">
            <a onClick={props.setState}>
                <img src={PlusGrdIcon} alt="PlusGrdIcon" />
            </a>
        </div>
          )
        } 
      })()}
       </>)
}


const IntroHeader = (props) => {
    return(<><div className="ins-progress">
        <div className="ins-circle ins-circle-active">
            <p>Informazioni di base</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
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
            <p>FAQ</p>
        </div></div>
    </>)
}

export {Intro, IntroHeader};
