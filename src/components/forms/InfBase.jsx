import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const InfBase = (props) => {
  const [val, setVal] = useState([]);
  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (i) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };
  //val 2
  const [val2, setVal2] = useState([]);
  const handleAdd2 = () => {
    const abc2 = [...val2, []];
    setVal2(abc2);
  };
  const handleChange2 = (onChangeValue, i) => {
    const inputdata2 = [...val];
    inputdata2[i] = onChangeValue.target.value;
    setVal2(inputdata2);
  };
  const handleDelete2 = (i) => {
    const deletVal2 = [...val2];
    deletVal2.splice(i, 1);
    setVal2(deletVal2);
  };

  return (
    <>
      <div className="ins-input-box">
        <h1>Informazioni di Base</h1>
        <h4>Nome dell'azienda</h4>
        <input
          type="text"
          name="nomeAzienda"
          value={props.inputs.nomeAzienda || ""}
          onChange={props.handleChange}
          placeholder="inserisci il nome"
        />
      </div>
      <div className="ins-input-box">
        <h4>Settore aziendale </h4>
        <select name="settore" onChange={props.handleChange}>
          <option disabled selected value>
            Seleziona una categoria
          </option>
          <option disabled value>
            SOCIALE
          </option>
          <option value="tipo1">Assistenza sociale</option>
          <option value="tipo2">Assistenza sanitaria</option>
          <option value="tipo3">Assistenza socio-sanitaria</option>
          <option value="tipo4">Educazione-istruzione-formazione</option>
          <option value="tipo5">Tutela ambiente ed ecosistema</option>
          <option value="tipo6">Valorizzazione patrimonio culturale</option>
          <option value="tipo7">Turismo sociale</option>
          <option value="tipo8">
            Formazione universitaria-post universitaria
          </option>
          <option value="tipo9">formazione extra-scolastica</option>
          <option value="tipo10">
            Servizi strumentali alle imprese sociali
          </option>
          <option disabled value>
            BLOCKCHAIN E INNOVAZIONE WEB3
          </option>
          <option value="tipo11">Blockchain in finanza e banche</option>
          <option value="tipo12">Blockchain nelle assicurazioni</option>
          <option value="tipo13">Blockchain nei pagamenti digitali</option>
          <option value="tipo14">Blockchain nell'agrifood</option>
          <option value="tipo15">Blockchain nell'industry 4.0</option>
          <option value="tipo16">Blockchain nell' IoT</option>
          <option value="tipo17">Blockchain nella sanità</option>
          <option value="tipo18">
            Blockchain nella pubblica amministrazione
          </option>
          <option value="tipo19">Blockchain nel retail</option>
          <option value="tipo20">Blockchain nella musica</option>
          <option value="tipo21">Blockchain in smart energy</option>
          <option value="tipo22">Blockchain per unbanked</option>
          <option value="tipo23">Crypto-Startup</option>
          <option value="tipo24">Startup Decentralizzata</option>
          <option value="tipo25">Progetto Decentralizzato</option>
          <option disabled value>
            CATEGORIE TRADIZIONALI
          </option>
          <option value="tipo26">Food startup</option>
          <option value="tipo27">Fashion startup</option>
          <option value="tipo28">Wear startup</option>
          <option value="tipo29">Travel startup</option>
          <option value="tipo30">Big data e internet app</option>
          <option value="tipo31">Biotecnologie</option>
          <option value="tipo32">Ecosostenibilità</option>
          <option value="tipo33">Ingegneria</option>
          <option value="tipo34">Mobile e smartphone</option>
          <option value="tipo35">Modellazione 3D</option>
          <option value="tipo36">Ricerca e sviluppo</option>
          <option value="tipo37">Software e internet delle cose</option>
          <option value="tipo38">Energia</option>
          <option value="tipo39">Intelligenza artificiale</option>
          <option value="tipo40">Scienza e trasporti</option>
          <option value="tipo41">Lavoro</option>
          <option value="tipo42">Telecomunicazioni</option>
          <option value="tipo43">Robot</option>
          <option value="tipo44">Farmaceutica</option>
          <option value="tipo45">Cibo e acqua</option>
          <option value="tipo46">Educazione</option>
          <option value="tipo47">Miglioramento della vita umana</option>
          <option value="tipo48">Pubblica amministrazione</option>
          <option value="tipo49">Realtà aumentata</option>
          <option value="tipo50">Programmazione</option>
          <option value="tipo51">Show business</option>
          <option value="tipo52">Automazione</option>
          <option value="tipo53">Tech per ogni età e popolo</option>
          <option value="tipo54">Paesi emergenti</option>
          <option value="tipo55">Software aziendali</option>
          <option value="tipo56">Telecomunicazioni</option>
          <option value="tipo57">Manufatturiero</option>
          <option value="tipo58">Giochi</option>
          <option value="tipo59">Musica</option>
          <option value="tipo60">Immobiliare</option>
          <option value="tipo61">Investimento</option>
          <option value="tipo62">Tecnologia educativa</option>
          <option value="tipo63">Innovazione</option>
          <option value="tipo64">Credito</option>
          <option value="tipo65">Assicurazione</option>
          <option value="tipo66">Agricultural technology</option>
          <option value="tipo67">Aerospaziale</option>
          <option value="tipo68">Hi-tech</option>
        </select>
      </div>
      <div className="ins-input-box">
        <h4>Logo</h4>
        <input
          name="logoAzienda"
          value={props.inputs.logoAzienda || ""}
          onChange={props.handleChange}
          type="file"
        />
      </div>
      <div className="ins-input-box">
        <h4>Descrizione Progetto</h4>
        <textarea
          name="descrizione"
          value={props.inputs.descrizione || ""}
          onChange={props.handleChange}
          type="textarea"
          placeholder="Inserisci una breve Descrizione"
        />
      </div>
      <div className="ins-input-box">
        <h4>Numero P.IVA (favoltativo)</h4>
        <input
          name="pIva"
          value={props.inputs.pIva || ""}
          onChange={props.handleChange}
          type="text"
          placeholder="Inserisci numero partita IVA"
        />
      </div>
      <div className="ins-input-box">
        <h4>Sito Web</h4>
        <input
          name="sito"
          value={props.inputs.sito || ""}
          onChange={props.handleChange}
          type="text"
          placeholder="Inserisci link "
        />
      </div>
      <div className="ins-input-box ">
        <h4>Social Media </h4>
        <div className="container-plus">
          <input
            name="socialMediaDef"
            type="text"
            placeholder="Inserisci link eventuali Social Media"
          />

          <button className="btn-plus-minus" onClick={() => handleAdd()}>
            +
          </button>
        </div>
        {val.map((data, i) => {
          return (
            <div className="container-plus">
              <input
                name={"socialMedia" + i}
                type="text"
                placeholder="Inserisci link eventuali Social Media"
                value={data}
                onChange={(e) => handleChange(e, i)}
              />
              <button
                className="btn-plus-minus"
                onClick={() => handleDelete(i)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      <div className="ins-input-box">
        <h4>
          Documentazione Aziendale (pitch, business plan, relazioni coi partner)
        </h4>
        <div className="container-plus">
          <input
            name="documentazioneDef"
            type="file"
            placeholder="trascina il o
                clicca per inserirlo
                (.pdf)"
          />

          <button
            style={{ marginTop: "0.9%", marginBottom: "0.9%" }}
            className="btn-plus-minus"
            onClick={() => handleAdd2()}
          >
            +
          </button>
        </div>
        {val2.map((data, i) => {
          return (
            <div className="container-plus">
              <input
                name={"documentazione" + i}
                type="file"
                placeholder="trascina il o
                clicca per inserirlo
                (.pdf)"
                value={data}
                onChange={(e) => handleChange2(e, i)}
              />
              <button
                style={{ marginTop: "0.9%", marginBottom: "0.9%" }}
                className="btn-plus-minus"
                onClick={() => handleDelete2(i)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>

      <div className="ins-input-box">
        <h4>Introduzione</h4>
        <textarea
          value={props.inputs.introduzione || ""}
          onChange={props.handleChange}
          name="introduzione"
          placeholder="inserisci un introduzione"
        />
        {/* <div className="ins-input-box">
          <h4>Immagine Introduzione </h4>
          <input
            name="fotoIntro"
            value={props.inputs.fotoIntro || ""}
            onChange={props.handleChange}
            type="file"
          />
        </div> */}

        <h4>Storia</h4>
        <textarea
          value={props.inputs.storia || ""}
          onChange={props.handleChange}
          name="storia"
          placeholder="inserisci la storia della tua azienda"
        />
        {/* <div className="ins-input-box">
          <h4>Immagine Introduzione </h4>
          <input
            name="fotoStoria"
            value={props.inputs.fotoStoria || ""}
            onChange={props.handleChange}
            type="file"
          />
        </div> */}

        <h4>Vision</h4>
        <textarea
          value={props.inputs.vision || ""}
          onChange={props.handleChange}
          name="vision"
          placeholder="inserisci la vision della vostra azienda"
        />
        {/* <div className="ins-input-box">
          <h4>Immagine Introduzione </h4>
          <input
            name="fotoVision"
            value={props.inputs.fotoVision || ""}
            onChange={props.handleChange}
            type="file"
          />
        </div> */}
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

const InfBaseHeader = (props) => {
  return (
    <>
      <div className="ins-progress">
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

export { InfBase, InfBaseHeader };
