/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../styles/components/footer.css";
import { pdfjs, Document, Page } from "react-pdf";
import { useTranslation } from "react-i18next";

const TabDocumenti = (props) => {
  const { t, i18n } = useTranslation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPdfs, setShowPdfs] = useState(
    Array(props.progetto.documentazioneListFiles.length).fill(false)
  );
  const [pdfBlobs, setPdfBlobs] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  useEffect(() => {
    const fetchPdfs = async () => {
      const blobs = await Promise.all(
        props.progetto.documentazioneListFiles.map(async (data) => {
          const url = `https://arweave.net/${data}`;
          const response = await fetch(url);
          if (response.ok) {
            return URL.createObjectURL(await response.blob());
          } else {
            return null;
          }
        })
      );
      setPdfBlobs(blobs);
    };

    fetchPdfs();
  }, [props.progetto.documentazioneListFiles]);

  const handleClick = (index) => {
    const newIsVisible = [...showPdfs];
    newIsVisible[index] = !newIsVisible[index];
    setShowPdfs(newIsVisible);
  };

  return (
    <div className="pc-content-grid-left">
      <h1>{t("document")}</h1>
      <div className="div-sep"></div>
      {pdfBlobs.map((blob, i) => (
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
          {showPdfs[i] && blob && (
            <Document file={blob} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1} />
              ))}
            </Document>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabDocumenti;
