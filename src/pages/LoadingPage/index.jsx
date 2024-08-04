"use client"
import React, { /*useState,*/ useEffect } from "react";
import { downloadProjects } from "../../utils/firebase/retriveInfo";
import { useTranslation } from "../../i18n/client";
import { useRouter } from "next/router"; // Import useRouter
import { getRecoil } from "recoil-nexus";
import { progettiState } from "../../recoilState.js";

const LoadingPage = () => {
  const { t } = useTranslation();
  const router = useRouter(); // Initialize useRouter

  //const loadingTexts = useMemo(() => [t("loading1"), t("loading2"), t("loading3"), t("loading4")], [t]); // Memoize loadingTexts array
  //const [currentText, setCurrentText] = useState(t("loading1"));

  useEffect(() => {
    const asyncFn = async () => {
      let status = await downloadProjects(t);
      if (status === true) {
        router.push("/Dashboard");
      }
    };
    asyncFn();

  }, [t]);

  /*useEffect(() => {
    const intervalId = setInterval(() => {
      // Rotate through loading texts
      setCurrentText(prevText => {
        const currentIndex = loadingTexts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 5000); // Change text every 5000 milliseconds (5 seconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [loadingTexts]);*/

  return (
    <div className="loadingDiv">
      <img src={"/assets/img/3yZR-unscreen.gif"} alt="Loading" srcSet="" />
      <h2>{t("loading1")}</h2>
    </div>
  );
}

export default LoadingPage;
