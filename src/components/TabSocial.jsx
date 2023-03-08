import React from "react";
import "../styles/components/footer.css";
import { InstagramEmbedm, FacebookEmbedm, TikTokEmbed, TwitterEmbed, YouTubeEmbed, LinkedInEmbed, InstagramEmbed, FacebookEmbed } from 'react-social-media-embed';


const TabSocial= (props) => {
  var socialList=[]
  for (let index = 0; index < props.socialMedia.length; index++) {
    
    const element = props.socialMedia[index];
    if (element.includes("instagram")) {
      socialList.push(<div style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed url={element} width={325} />
      <br></br></div> )
    } else if (element.includes("twitter")) {
      socialList.push(<div style={{ display: 'flex', justifyContent: 'center' }}>
      <TwitterEmbed url={element} width={325} />
      <br></br></div> )
    }else if (element.includes("facebook")) {
      socialList.push(<div style={{ display: 'flex', justifyContent: 'center' }}>
      <FacebookEmbed url={element} width={325} />
      <br></br></div> )
    }else if (element.includes("tiktok")) {
      socialList.push(<div style={{ display: 'flex', justifyContent: 'center' }}>
      <TikTokEmbed url={element} width={325} />
      <br></br></div> )
    }else if (element.includes("linkedin")) {
      socialList.push(<div style={{ display: 'flex', justifyContent: 'center' }}>
      <LinkedInEmbed url={element} width={325} />
      <br></br></div> )
    }else if (element.includes("youtube")) {
      socialList.push(<div style={{ display: 'flex', justifyContent: 'center' }}>
      <YouTubeEmbed url={element} width={325} />
      <br></br></div> )
    } else
    socialList.push(<></>)
     
    
  }
  return (
    <div className="pc-content-grid-left">
       {socialList}
    </div>
  );
};

export default TabSocial;
