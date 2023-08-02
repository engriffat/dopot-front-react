/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../styles/components/footer.css";
import BlogPost from "./PaginaCard/BlogPost";
import { pdfjs, Document, Page } from "react-pdf";
import { useTranslation } from "react-i18next";

const TabDocumenti = (props) => {
  const { t, i18n } = useTranslation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPdfs, setShowPdfs] = useState(
    Array(props.progetto.documentazioneListFiles.length).fill(false)
  );

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  const handleClick = (index) => {
    const newIsVisible = [...showPdfs];
    newIsVisible[index] = !newIsVisible[index];
    setShowPdfs(newIsVisible);
  };

  return (
    <div className="pc-content-grid-left">
      <h1>{t("document")}</h1>
      <div className="div-sep"></div>
      {props.progetto.documentazioneListFiles.map((data, i) => {
        const url = `https://arweave.net/${data}`;
        return (
          <div
            key={"document" + i}
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
            <h3>
              <button onClick={() => handleClick(i)}>Document {i + 1}</button>
            </h3>
            {showPdfs[i] && (
              <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={1}
                  />
                ))}
              </Document>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TabDocumenti;
