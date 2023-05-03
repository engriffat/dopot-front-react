import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const Faq = (props) => {
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
  return (
    <>
      <div className="ins-input-box">
        <h1>Spiega le FAQ della tua campagna</h1>
        <h4>Quali sono le domande più frequenti che potresti ricevere?</h4>
        <div>
          <div className="container-plus">
            <input
              name="titoloDomandaDef"
              onChange={props.handleChange}
              type="text"
              placeholder="Scrivi la prima domanda"
            />

            <button className="btn-plus-minus" onClick={() => handleAdd()}>
              +
            </button>
          </div>
          <textarea
            name="rispostaDomandaDef"
            onChange={props.handleChange}
            placeholder="Rispondi alla domanda"
          />
        </div>
        {val.map((data, i) => {
          return (
            <div>
              <div className="container-plus">
                <input
                  name={"titoloDomanda" + i}
                  type="text"
                  value={data}
                  onChange={(e) => handleChange(e, i)}
                  placeholder="Scrivi la domanda"
                />
                <button
                  className="btn-plus-minus"
                  onClick={() => handleDelete(i)}
                >
                  x
                </button>
              </div>
              <textarea
                name={"rispostaDomanda" + i}
                placeholder="Rispondi alla domanda"
              />
            </div>
          );
        })}
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

      <div className="proceed-btn-box">
        <input className="grd-btn dopot-btn-lg" type="submit" />
      </div>
    </>
  );
};

const FaqHeader = (props) => {
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-done">
          <p>Informazioni di base</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Questionario</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Progetto</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Prodotto</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Nft Mint</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-active">
          <p>FAQ</p>
        </div>
      </div>
    </>
  );
};

export { Faq, FaqHeader };
