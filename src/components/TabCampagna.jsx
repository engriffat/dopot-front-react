import React, { useState } from 'react';
import "../styles/components/footer.css";
import BlogPost from "../components/PaginaCard/BlogPost";
import BlogImg from "../assets/img/void.jpg";
import ImageIcon from "../assets/img/pc-img-icon.png";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stakeProject } from "../utils/firebase/writeInfos";

const TabCampagna = (props) => {
  const { t, i18n } = useTranslation();
  const [stakedValue, setStakedValue] = useState(0);

  const handleChange = (e) => {
    setStakedValue(e.target.value);
  };

  const stake = async () => {
    if (stakedValue > 0) {
      try {
        await toast.promise(stakeProject(props.address, stakedValue), {
          pending: t("confirm"),
          success: t("stakeDone"),
          error: t("error"),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="pc-content-grid-left">
      <BlogPost heading={t("introduction")} text={props.introduzione} />
      <BlogPost heading={t("story")} text={props.storia} />
      <BlogPost heading="Vision" text={props.vision} />
      <h2>{t("stakeDptProject")}</h2>
      <input
        className="stakeInput"
        name={"stakeAmount"}
        value={stakedValue}
        onChange={handleChange}
        type="number"
        onWheel={(e) => e.target.blur()}
        placeholder={""}
      />
      <input className="grd-btn dopot-btn-sm" type="submit" value="Stake" onClick={stake}/>
      </div>
  );
};

export default TabCampagna;
