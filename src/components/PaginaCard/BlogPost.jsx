"use client"
import React from "react";

const BlogPost = (props) => {
  return (
    <div className="blogpost-box">
      <h2 style={{ color: "#c22e80" }}>{props.heading}</h2>
      <p className="box-bk-over-logo">{props.text}</p>
      {(() => {
        if (props.img != null) {
          return (
            <img
              src={"data:image/jpg;base64," + props.img.base64}
              alt="BlogImg"
            />
          );
        }
      })()}
    </div>
  );
};

export default BlogPost;
