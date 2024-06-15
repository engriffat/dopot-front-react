import React from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import "../styles/components/header.css";
import "react-circular-progressbar/dist/styles.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopottoken.css";
import WeaveDB from "weavedb-sdk"

const weavetry = () => {

  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: "NkYdataKkg9KYtjbopSyjqeFTfBGEa6h66zHSdB33W8",
        //nocache: true,
        //remoteStateSyncEnabled: true,
        //remoteStateSyncSource: "https://dre-1.warp.cc/contract",
      })
      await db.init()
      const { identity } = await db.createTempAddress()
      console.log("identity", identity)
    } catch (e) {
      console.log(e)
    }
  }
  return (
      <button onClick={start}>Start</button>
  )
};

export default weavetry;
