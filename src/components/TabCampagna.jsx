import React from "react";
import "../styles/components/footer.css";
import BlogPost from "../components/PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";


const TabCampagna = (props) => {
  return (
    <div className="pc-content-grid-left">
                <BlogPost
                  heading="Introduzione"
                  text={props.introduzione}
                  img={props.fotoIntroduzioneListFiles}
                />
                <BlogPost
                  heading="Storia"
                  text={props.storia}
                  img={props.fotoStoriaListFiles}
                />
                <BlogPost
                  heading="Vison"
                  text={props.vision}
                  img={props.fotoVisionListFiles}
                />
              </div>
  );
};

export default TabCampagna;
