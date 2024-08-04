"use client"
import React from "react";
import BlogPost from "./PaginaCard/BlogPost";

const TabRoadmap = (props) => {// foreach titolo blogpost heading titolo text desc[i]
  return (
    <div className="pc-content-grid-left">
      <h1>Roadmap</h1>
      <div className="div-sep"></div>
      {props.titoloRoadStep.map((titolo, i) => 
        <BlogPost heading={titolo} text={props.descrRoadStep[i]} />)
      }
      </div>
  );
};

export default TabRoadmap;
