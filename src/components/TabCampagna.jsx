import React from "react";
import "../styles/components/footer.css";
import BlogPost from "../components/PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";

const TabCampagna = (props) => {
  return (
    <div className="pc-content-grid-left">
      <BlogPost heading="Introduzione" text={props.introduzione} />
      <BlogPost heading="Storia" text={props.storia} />
      <BlogPost heading="Vision" text={props.vision} />
    </div>
  );
};

export default TabCampagna;
