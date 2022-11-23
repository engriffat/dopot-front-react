import React from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const InfBase = (props) => {
    return(<><div className="ins-input-box">
            <h4>Nome dell'azienda</h4>
            <input type="text"  name="nomeAzienda" value={props.inputs.nomeAzienda || ""} 
        onChange={props.handleChange}  placeholder="inserisci il nome" />
        </div><div className="ins-input-box">
            <h4>Settote aziendale </h4>
            <select name="settore" onChange={props.handleChange}  >
                 <option disabled selected value>seleziona un opzione </option>
                <option value="tipo1">tipo 1</option>
                <option value="tipo2">tipo 2</option>
                <option value="tipo3">tipo 3</option>
                <option value="tipo4">tipo 4</option>
            </select>
        </div><div className="ins-input-box">
            <h4>Logo</h4>
            <input
            name="logoAzienda" value={props.inputs.logoAzienda || ""} 
            onChange={props.handleChange}
                type="file" 
                />
        </div><div className="ins-input-box">
            <h4>Numero P.IVA (favoltativo)</h4>
            <input
                name="pIva" value={props.inputs.pIva || ""} 
                onChange={props.handleChange}
                type="text"
                placeholder="Inserisci numero partita IVA" />
        </div><div className="ins-input-box">
            <h4>Sito Web</h4>
            <input
                name="sito" value={props.inputs.sito || ""} 
                onChange={props.handleChange}
                type="text"
                placeholder="Inserisci link " />
        </div>
        <div className="ins-input-box">
            <h4>Social Media </h4>
            <input
                name="socialMedia" value={props.inputs.socialMedia || ""} 
                onChange={props.handleChange}
                type="text"
                placeholder="Inserisci link eventuali Social Media" />
        </div>
        <div className="ins-input-box">
            <h4>documentazione aziendale (pitch, business plan, relazioni coi partner)</h4>
            <input
                name="documentazione" value={props.inputs.documentazione || ""} 
                onChange={props.handleChange}
                type="file" placeholder="trascina il o
                clicca per inserirlo
                (.pdf)"
                
                />
        </div>

        <div className="ins-input-box">

    <h4>Introduzione</h4>
    <textarea  value={props.inputs.introduzione || ""} 
        onChange={props.handleChange} name="introduzione" placeholder="inserisci un introduzione" />
    <div className="ins-input-box">
        <h4>Immagine Introduzione </h4>
        <input
        name="fotoIntro" value={props.inputs.fotoIntro || ""} 
        onChange={props.handleChange}
            type="file" 
            />
    </div>

    <h4>Storia</h4>
    <textarea value={props.inputs.storia || ""} 
        onChange={props.handleChange} name="storia" placeholder="inserisci la storia della tua azienda" />
    <div className="ins-input-box">
        <h4>Immagine Introduzione </h4>
        <input
        name="fotoStoria" value={props.inputs.fotoStoria || ""} 
        onChange={props.handleChange}
            type="file" 
            />
    </div>

    <h4>Vision</h4>
    <textarea value={props.inputs.vision || ""} 
        onChange={props.handleChange} name="vision" placeholder="inserisci la vision della vostra azienda" />
    <div className="ins-input-box">
        <h4>Immagine Introduzione </h4>
        <input
        name="fotoVision" value={props.inputs.fotoVision || ""} 
        onChange={props.handleChange}
            type="file" 
            />
    </div>

    
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


const InfBaseHeader = (props) => {
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

export {InfBase, InfBaseHeader};
