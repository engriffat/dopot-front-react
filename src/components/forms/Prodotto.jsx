import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { NftMint, NftMintHeader } from "./NftMint";

const Prodotto = (props) => {
  const [numeroProdotti, setnumeroProdotti] = useState(1);

  function toggleNumeroProdotti(event) {
    setnumeroProdotti(event.target.value);
    const fevent = {
      target: { name: "numeroProdotti", value: event.target.value },
    };
    props.handleChange(fevent);
  }

  return (
    <>
      <div class="ins-input-box">
        <h1>Informazioni sui Prodotti che offri</h1>
        <h4>Quanti prodotti offri?</h4>
        <div className="ins-btn-box">
          {[1, 2, 3, 4].map((value) => (
            <button
              key={value}
              value={value}
              onClick={toggleNumeroProdotti}
              className={
                numeroProdotti === value
                  ? "grd-btn dopot-btn-lg"
                  : "purple-border-btn dopot-btn-lg"
              }
              type="button"
            >
              {value}
            </button>
          ))}
        </div>
        <br />
        <br />
        <Tabs>
        <TabList>
          {(() => {
            const tabs = [];
            for (let i = 0; i < numeroProdotti; i++) {
              tabs.push(<Tab key={i}>Prodotto {i + 1}</Tab>);
            }
            return tabs;
          })()}
        </TabList> 
          {(() => {
            const tabPanels = [];
            for (let i = 0; i < numeroProdotti; i++) {
              tabPanels.push(
                <TabPanel key={i} index={i} keepMounted>
                  <SchedaProdotto
                    nProdotto={i + 1}
                    inputs={props.inputs}
                    handleChange={props.handleChange}
                    handleChangeNft={props.handleChangeNft}
                    setState={props.incrementStep}
                  />
                </TabPanel>
              );
            }
            return tabPanels;
          })()}
        </Tabs>
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

const SchedaProdotto = (props) => {
  return(
    <>
    <div className="ins-input-box">
      <h4>Nome prodotto n {props.nProdotto}</h4>
      <input 
        name={"name" + props.nProdotto}
        value={props.inputs["name" + props.nProdotto]}
        onChange={props.handleChange}
        type="text" 
        placeholder="inserisci il nome"
      />
  </div>
  <div className="ins-input-box">
    <h4>Descrizione</h4>
    <input
      name={"description" + props.nProdotto}
      value={props.inputs["description" + props.nProdotto]}
      onChange={props.handleChange}
      type="text"
      placeholder="descrivi il tuo prodotto"
    />
  </div>
  <div className="ins-input-box">
    <h4>Specifiche tecniche </h4>
    <input
      name={"specs" + props.nProdotto}
      value={props.inputs["specs" + props.nProdotto]}
      onChange={props.handleChange}
      type="text"
      placeholder="caratteristiche"
    />
  </div>
  <div className="ins-input-box">
      <h4>Prezzo </h4>
      <input
        name={"price" + props.nProdotto}
        value={props.inputs["price" + props.nProdotto]}
        onChange={props.handleChange}
        type="number"
        placeholder="Il costo del prodotto"
      />
  </div>
  <div className="ins-input-box">
    <h4>Supply </h4>
    <input
      name={"supply" + props.nProdotto}
      value={props.inputs["supply" + props.nProdotto]}
      onChange={props.handleChange}
      type="number"
      placeholder="quanti esemplari saranno disponibili"
    />
</div>

      <div className="ins-input-box">
        <h4>Foto del prodotto</h4>
        <input
          name={"fotoProdotto" + props.nProdotto}
          value={props.inputs["fotoProdotto" + props.nProdotto]}
          onChange={props.handleChange}
          type="file"
          placeholder="trascina il file o
        clicca per inserirlo"
          multiple
          accept=".png,.jpg,.jpeg"
        />
      </div>
      <NftMint
        nProdotto={props.nProdotto}
        inputs={props.inputs}
        handleChangeNft={props.handleChangeNft}
      ></NftMint>
    </>
  );
};

function convertToVariable(str) {
  return eval("var " + str + " = " + "null");
}

const ProdottoHeader = (props) => {
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
        <div className="ins-circle ins-circle-active">
          <p>Prodotto</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>NFTs Mint</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>FAQ</p>
        </div>
      </div>
    </>
  );
};

export { Prodotto, ProdottoHeader };
