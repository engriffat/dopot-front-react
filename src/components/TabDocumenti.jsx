import React from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";

const TabDocumenti = (props) => {
  return (
    <div className="pc-content-grid-left">
      <h1>Documenti Aziendali</h1>
      <div className="div-sep"></div>
      {/* <div>{props.progetto.documentazione}</div> */}
      <div
        style={{
          textAlign: "center",
          border: " 1px solid #ff43a0",
          padding: "1.5rem",
          backgroundColor: "#fffafa",
          borderRadius: "0.5rem",
          // font-size: 1.75rem;
          outline: 0,
          marginBottom: "3rem",
        }}
      >
        <h3>Documento 1</h3>
      </div>
    </div>
  );
};

export default TabDocumenti;
