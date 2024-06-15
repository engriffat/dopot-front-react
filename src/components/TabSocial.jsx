import React from "react";
import "../styles/components/footer.css";

const TabSocial = (props) => {
  var socialList = [];
  for (let index = 0; index < props.socialMedia.length; index++) {
    const element = props.socialMedia[index];
    if (element.includes("instagram")) {
      socialList.push(
        //  <div style={{ display: 'flex', justifyContent: 'center' }}>
        // <InstagramEmbed url={element} width={325} />
        // <br></br></div> )

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
          <h2 className="h2-social">INSTAGRAM Link</h2>
          <a target="_blank" href={element} className="link-social-new">
            {element}
          </a>
          <br></br>
        </div>
      );
    } else if (element.includes("twitter")) {
      socialList.push(
        // <div style={{ display: "flex", justifyContent: "center" }}>
        //   <TwitterEmbed url={element} width={325} />
        //   <br></br>
        // </div>
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
          <h2 className="h2-social">TWITTER Link</h2>
          <a target="_blank" href={element} className="link-social-new">
            {element}
          </a>
          <br></br>
        </div>
      );
    } else if (element.includes("facebook")) {
      socialList.push(
        // <div style={{ display: "flex", justifyContent: "center" }}>
        //   <FacebookEmbed url={element} width={325} />
        //   <br></br>
        // </div>
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
          <h2 className="h2-social">FACEBOOK Link</h2>
          <a target="_blank" href={element} className="link-social-new">
            {element}
          </a>
          <br></br>
        </div>
      );
    } else if (element.includes("tiktok")) {
      socialList.push(
        // <div style={{ display: "flex", justifyContent: "center" }}>
        //   <TikTokEmbed url={element} width={325} />
        //   <br></br>
        // </div>
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
          <h2 className="h2-social">TIKTOK Link</h2>
          <a target="_blank" href={element} className="link-social-new">
            {element}
          </a>
          <br></br>
        </div>
      );
    } else if (element.includes("linkedin")) {
      socialList.push(
        // <div style={{ display: "flex", justifyContent: "center" }}>
        //   <LinkedInEmbed url={element} width={325} />
        //   <br></br>
        // </div>
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
          <h2 className="h2-social">LINKEDIN Link</h2>
          <a target="_blank" href={element} className="link-social-new">
            {element}
          </a>
          <br></br>
        </div>
      );
    } else if (element.includes("youtube")) {
      socialList.push(
        // <div style={{ display: "flex", justifyContent: "center" }}>
        //   <YouTubeEmbed url={element} width={325} />
        //   <br></br>
        // </div>
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
          <h2 className="h2-social">YOUTUBE Link</h2>
          <a target="_blank" href={element} className="link-social-new">
            {element}
          </a>
          <br></br>
        </div>
      );
    } else socialList.push(<></>);
  }
  return <div className="pc-content-grid-left">{socialList}</div>;
};

export default TabSocial;
