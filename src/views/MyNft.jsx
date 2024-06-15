/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-loop-func */
import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
import ProfileIcon2 from "../assets/img/ins-project-def.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIcon5 from "../assets/img/widget.png";
import ProfileIcon6 from "../assets/img/identity.png";
import ProfileIconGrd1 from "../assets/img/profile-icon-grd-1.png";
import ProfileIconGrd2 from "../assets/img/profile-icon-grd-2.png";
import React, { useState, useEffect } from "react";
import { getRecoil } from "recoil-nexus";
import { addressState, progettiState } from "../recoilState";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from "react-i18next";
import { getNftImage } from "../utils/firebase/retriveInfo";
import { addShippingDetailsNft, refundNft } from "../utils/firebase/writeInfos";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [investedCard, setinvestedCard] = useState([]);
  let projects = getRecoil(progettiState);
  const address = getRecoil(addressState);
  const [isActive2, setActive2] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted
  
    async function fetchData() {
      let tempCard = [];
      for (const project of projects) {
        let tiers = project.investors[address];
        let tierId = 0;
        for (const tokenId in tiers) {
          if (tiers.hasOwnProperty(tokenId)) {
            try {
              let obj = await getNftImage(tokenId);
              const response = await fetch(obj.image.replace("ar://", "https://arweave.net/"));
              const data = await response.blob();
              let reader = new FileReader();
              reader.readAsDataURL(data);
              reader.onloadend = function () {
                if (isMounted) {
                  let base64data = reader.result;
                  tempCard.push({
                    tokenId,
                    addressCreator: project.addressCreator,
                    image: base64data,
                    project: project.address,
                    addressDopotReward: obj.addressDopotReward,
                    title: project.imageNftDefListFiles[tokenId]?.name,
                  });
                  setinvestedCard([...tempCard]); // Assuming setinvestedCard is a state updater function
                }
              };
            } catch (error) {
              console.error("Error fetching data:", error);
              // Handle error as needed
            }
          }
          tierId++;
        }
      }
    }
    if(projects)
      fetchData();
  }, []);

  async function setShippingDetails(project, tokenId, title) {
    const shippingDetails = window.prompt(t("shippingDetails"));
    if (shippingDetails)
      await addShippingDetailsNft(project, tokenId, shippingDetails, title);
  }

  return (
    <div className="app">
      <main className="profile-page">
        <section className="profile-top-section">
          <div className="box">
            <div className="pts-content">
              <div className="pts-left">
                <a href="#">
                  <img src={ProfileIconArrowLeft} alt="ProfileIconArrowLeft" />
                </a>
                <div className="profile-img-box">
                  <h3>
                    {t("profileof")}{" "}
                    {address &&
                      address.toString().substring(0, 5) + "..." + address &&
                      address.toString().substring(38, 42)}
                  </h3>
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <a href={"/#/profile"}>
                      <img src={ProfileIcon1} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/profile"}>
                      <p>{t("overview")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/insprogetto"}>
                      <img src={ProfileIcon2} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/insprogetto"}>
                      <p>{t("createcampaign")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/mynft"}>
                      <img
                        className="nft-img"
                        src={ProfileIcon3}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"/#/mynft"}>
                      <p>{t("mynft")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/myprojects"}>
                      <img src={ProfileIcon4} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>{t("myprojects")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={ProfileIcon5} alt="ProfileIcon" />
                    </a>
                    <a
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>DAO</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={ProfileIcon6} alt="ProfileIcon" />
                    </a>
                    <a
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>{t("identity")}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="pts-icons-box">
          <div className="pts-icons-card">
            <img src={ProfileIconGrd1} alt="ProfileIconGrd" />
            <p>I Miei NFT</p>
          </div>
        </div> */}
        <div className="box0">
          <div className="sec-inv-desk-flex">
            <img src={ProfileIconGrd2} alt="ProfileIconGrd" />
            <p>{t("myinvestments")}</p>
          </div>
        </div>

        <div className="box1">
          <div className="sec-inv-mob">
            <button>
              <img
                className={isActive2 ? "shadow-inv" : null}
                src={ProfileIconGrd2}
                alt="ProfileIconGrd"
              />
              <p>I miei Investimenti</p>
            </button>
          </div>
        </div>

        <section className="profile-bottom">
          <div className="box">
            <div className="profile-main-grid">
              {investedCard &&
                investedCard.map((card, _index) => (
                  <div className="pmg-right-card-nft">
                    <div
                      className="pmg-rc-left"
                      style={{ paddingBottom: "5px" }}
                    >
                      <img src={card.image} alt="" />
                    </div>
                    <div>
                      {/* <div className="pmg-rc-right">
                      <div className="pc-hero-icon-grid"></div>
                    </div> */}
                      <div className="dropdown-container d-flex" tabindex="-1">
                        <div className="three-dots box-bk-over-logo"></div>
                        <div className="dropdown">
                          <a
                            onClick={() =>
                              setShippingDetails(
                                card.project,
                                card.tokenId,
                                card.title
                              )
                            }
                          >
                            <div>{t("setshipping")}</div>
                          </a>
                          <a
                            href={`https://staging.push.org/chat/${card.addressCreator}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div>{t("contactcreator")}</div>
                          </a>
                          <a
                            onClick={() => refundNft(card.project, card.tokenId, t, navigate)}
                          >
                            <div>{t("getrefund")}</div>
                          </a>
                          <a
                            href={`https://resolve.kleros.io/create/`} // update for kleros 2.0 if needed
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div>{t("opencase")}</div>
                          </a>
                        </div>
                      </div>
                      <div className="pmg-btn-box-nft">
                        {/* <input type="checkbox" id="click" /> */}
                        <a
                          href={`https://testnets.opensea.io/assets/mumbai/${card.addressDopotReward}/${card.tokenId}`}
                          target="_blank"
                          className="grd-btn dopot-btn-lg"
                          rel="noreferrer"
                        >
                          Swap
                        </a>
                        {/* <div class="content">
                          <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxINDw8NDQ8PDQ4NEA4ODQ8NDQ8NDg8PFRYXFhcVFRUYHiggGBomHBYWIzEiJSkuLi4uFx8zRDMsNyguLisBCgoKDg0OGxAQGi0lHiUtKystLSstLS0tLS0tLS8vLS0tLS0tLS0tLy0tLS0rLS0tLS0tKy0tLS0tLS0tLS0tLf/AABEIALEBHAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIEBQYDBwj/xABNEAABBAEBBAMIDAoKAwEAAAABAAIDBBEFBhIhMRNBUQcUFTNhdIGUIjI0U1RxkZOxsrTRFiNzlaGzwsPS1AgkNUJSYmRywdOEkqJF/8QAGQEBAQADAQAAAAAAAAAAAAAAAAECAwQF/8QAPBEAAgEDAgMDCQUGBwAAAAAAAAERAgMhBDESQVETInEUMkJhcoGRsfAjUpOhwbLC0uHi8QU0Q2JjktH/2gAMAwEAAhEDEQA/APh6IiygBERIARESAEREgBERIARESAEREgBERIARESAEREgBERIARQpSAEREgBERIARESAEUKUgBERIARESASpUos4KQoVkSAQoVkSAVRWRIBVSpRIBChWRIBCKwHo8vYvr1DYur08elyUZ3CWmLDtTDyGMkILuAxgAcuJznqwuLV623pY48zLxGyid2p3WFl8kZU0tnx9QvSVga5zQQ4NJAcOTgDzCqu2DEqthoWlSX7EVWH28rsAnkB1krBWw0LVpdPsxW6+70sRy0PBLHAjBDhkZBBWu8q+zq7LzocTtPKfeFvk3+q7IxMpzXqN1lyOpK2G2BG9hY5xDQW7wG83Lhx5H0Ljl3m2e1hlh7xq1a9KC02rdt9ACXzyvjZLhxPJoc7/5HHqXCrRou1driuuZcraYaW7SSfPZerkWqJwVW32a0N1+Yxh7Yo42Omnlf7WKJoy5x9AK1S3Oy+0EmmT98RNjlDmOhmimBMcsTubTjr8v0jIW3UK72VXY+fGJ6/W04nfBFE5M3aLZdlapDqFOy23TmlNff3HxSNmAccFrgDya79HauXXZ7fbQ9M86XBXhpUqNibchgB9nKCW9I8nrxngOW8ea45a9GrrtJ3XLeVts9pjDcc0iuJwVRWRdUEKorIkAqisiQCqKyJAKorIkAhQrIkAnCYVkWyAVwmFZEgFcJhWRIBXCYVkSAVwmFZEgFcJhWRIBXC6sbRWxo/ewtT9EbPQFvSHxHRZ6Pt3PJnHUuWW1//N/839wufUUJ8Er0l+oRp8KcKyLogFcJhWQKpZBstofGxeZ6f9njWqwtttEMSRA8CKen5B5j+rxrWLm0i+wo9lfJBlcKCFdeleu6Z7YomukkkIaxrRlznHqC6NssGdtR7vu+dWP1hWtawnJAJA54BOPjWx2je19225jmva6xOWuaQ5rm75wQRzHlX1PZHS5m09NfQ7zZHvdJrIudEJejdukE743mN3d5wxjO808QvMu6ryXTW3wy2kknjamej8Nt2lzMlTL+up8ZwmFudrnV3X7Zo4716Z/QlvtSOst/yk5I8hC1C9GhuqlVNRKTh7qVs/DYxK4TCsiygFcJhWRIBXCYVkSAVwmFZEgFcJhWRIARWRbYKVRWRIBVFZFIBVFZFYBVMKyJAIwowrIkA9qVV872xRtLnvOGtHykkngABkkngACVnalMyOJtKFwkayQzTTjJbJMW7uIx72BwBPFxJPAYArpLiIrxBIPegGQcHBs1wR6RwWtXOl2lxztS/i4Tl+E4Xv3iB6Vqz5nCOJjpHnk1gJKm3Ukgd0c0b4ngZ3XtLTjt49S7DucWIv65VdZ7wt242xU7WSNx+9xaHD2pI4Z4deCDhendK1KKRtCkywL9mhFIy3bAOJHuLcMDjxeQG8Tx5885XN5Vd8s7Dg7q3efuynMcLU92JmSxiZOEwttUjZWjZZlDZJZMuqwuAdGA1xZ00o6wHNcAzrLcn2PB2rWw1TxNDzR/2uyum+uJ02+VTh+EN/nGY5SiMwrEzpXukkc573kue9xy5zjzJK8l3OlbFwP71gtXHV7uoR9LVhbEXs3TkN33chktOB5OpchqFN1eaavJjfglkhfjlvMcWnHkyFhY1li9W7dt5SnZxExK6qU1gsNGKtzZk7zj6CIETTQxuszciI5WNeIY+xu64bzubuLfa53tOtntD48ebUfs0Syu0qu5TRVtFTjq06Ynqs7bEPSlGyvC25I0SySOeyrG4B0Yczd3pJAeDgN4YZyJ58Bh2rsSule6SRxkkeS573nec5x5klbO97hpflLv0xLVLK1TxN1veWvcqmkvDE+t8xBGFGFZFugEYUYVkSAVRWRWAVTCsiQCMKMKyKQCqKyJAJRSizBCKUQEIpWRQpSWZGwwMdLI84axoySpU1SnU3CRTGRbTWdAs0C1tuF0O/7QkcHelazCluum7Sq7blPmsr8iEIpwizhghFKKAz9M8Ve81b9qrLXrY6Z4q95q37VWWvWiyu/c9pfsUAzNE911fOK36xq89R8fN+Vl+sV7aJ7qq+cVv1jV46j46b8rL9Yov8w/ZXzqBjLYap4qh5o/7XZWAtjqniqHmjvtdlLvn2/af7FQOs0bbmeGjvmCpNZ090FelZngL54Y5GyZ454kCMAfpyuFnldI90kji98jnPe53Euc45JPlJK2FX3Db84o/VsLWLVpNPatVXOzpSmrl7NL+bfxLkqVs9ofHjzej9miWuWy1/x483o/ZoltqX29Ps1/Ogha77hpflLv0xLVLb2mk0qIAyTLcAA5knolH4N2/gz/AEloP0qW7lFFPfqS71e7S9OrqDUotq7Z20Bk134+Nn3rrqewld87dMfPOzU5Kwst/FN70aSN4MLs5JxxPDHVnK1X/wDENPZUuqcNvh70JbtxyUqSwz54is5uCQeYJB9ChdzUEIRSigIRSmFeFghFstG0SxfeY6kTpnNGXbo4AeUrx1PTpakpgsxuhlbglrh1HkR2ha1dtu47SqXEsxOY6xuXO5hopRZkCIiyARbDQ9KfesxVYcb8zt0E8gOsldJZ2MjmrS2NLsuvOqyCKxH0Lo3ZP95meY+njyXLe1tmzWqK3DccnCltKXspaaUlhnFrpdhdXgpzzC30jIrVaWs6aEZlgMg3d9vXyJ5ceS1/4OXPgk/zTk/B258En+acsNTVpdRaqtV3FD6VJP3ZGTpdodoqsFKrpemuN9kEj5nWbtVjm+yyBHHHIMgeyJzgdXPJXL+GXe8UvzfW/hWHZgfC90crHRyNxvMe0tcMjI4HtBB9K67S9joXirHbuGtb1BgkqQiIuBachhe7k3JBA7cdS57lvRaS2qriTmapjib9KqrCfi3skMs53wy73il+b638KyKt5tkmCeOrEJhuRzR14q5hm5sc5zB7Qn2LuwOJ5gK1vZW7DJJEa0zjG9zN5kbnNdunGR5F4fg5c+CT/NOWx06JruVUJ8mmk10e68ejJBrp4nRvdG8Fjo3OY9p5tc04IPpC810zq+pOxvVN8gNbvy6bWlkIaABvPdGXOOAOJJPBVNXUPgTPzTS/61l5Y+tv8T9OHH5+JT22a2Tt3IZ31Y+kZNEIyePDErJP3f6Vqtf0GfTpBDaYWOc3ebwOD2j4x/yO1ffu4vv94YlYI3gneAY2Pjl391oAHoWb3TtkW6rUdugCeIF8R/zD/jqPkPkC006iuhu76MzUt8bSms4SWOaThTBPUfnjZbSprdmMVm78kUkUgbx44dn9lZm1mydqgG2LbWxizNIGNyS7PFxPxLqO4lC6PU5I3tLHswxzTwLXDfBC6b+kX4ih+Wl+osqrtXlKaeOKmnk5XDxfNymmU+M6VpslyUQQjekIJAwTniB1fGuut9zrUnsgaa5/ExGIYBzxlkk/efoWL3J/7Vg+J31mL713Sdem0zT5LVQMfO10TWNka57SHPaDkNIPInrTU3qlc3810pbb1JLn66vzB8Qg7nepCCWHvc4kfA/iDn8WJB+2uW2h0OXTZ+9rOBLuMkcGkuwHdR8vBdyO7Jq3vVX1Wf8A7FxO1GvzapZfbtCNsxa2NwiY5jQG8ORJOfStumV/tJq815fmuXCS26JEZtanc9vzsEkUJex3tXAHBWfqPc71KV4ca5yI4I+AJ8XG2P8AZW+od2ySvEyGLTYgyMbrf607+BfYtkNb8I04bRbuGVjHOaDkAkAkZ6+a5qbt/jo7RNVQ+VMejKxPqKz4NHsBqe5VZ3v7nlkkHPJLnMPH/wBFoNptmLUFuZr68kjnPdKTDDK9gMhLt3IHMZX2LaLuk36duetDo81mKJ26yZrZ92QYByN2Mjrxz6l8s2utahqlyS73hdq9I2NvRRw2nNG60DOd0c8di1WNSnWq6blKTTfedPpNVbJz1efgSOpzfgWx8Eteqzfcux/DDWeg6HvZ2/0Xe/fng+bv3o+WOk5Zx14z18+K5jwZqHwfUPmLX3J4Mv8AwfUPmbX3Ldeqs3nS7ldp8OVOY8O8MmKNGs/BbPqs33J4Hs/BbXqs33LK8GX/AIPqHzNr7lHgu/8AB9Q+Ztfct/lf/Lb+P9Qj6+kY3gaz8FteqzfcveHQrDzh0MkDAC6SWxHJDDEwc3PcRwH6TwABJwrjTb/vF/0w2Qofo95ww6vccOx8UxHyFPKZ/wBW38f6vrnOwhiTUWQ4jrQwvjbwMtqtFNNM7reQ7O4Oxo5DrJyV5+GXe8UvzfW/hU/g9b+CWPmXre6ZslF0deTUrDqLr0joqrOhc5zi0tBL+HsW5c0ZPb5CVquV6G3TNUVP1d+p4l7S+TbeyXRYLDPfZ7W6U1S1p2puNEWZI5xYqVm7nsMfi3xxjPMZ5fJgZwe6BrsV6eAVekdBTqxVY5px+On3c/jHZ48c9fHr61qdodIfp9qanKQ58Dt0ubycC0OafJlrhwWsWzT6LTq4tTbcp96nouJJNpcpSX8thL2CIi9AgRESQZuj6nJSnitV3BssLt5u8N5p6iCOsEZC3m0G28t2u6oyrUowzSCa0KkZY6xKDnLyTyzg47RzXabMbPEw6Z3vQrXql2Mu1GzNh74nHg4Djhu78RycjhhfPtXrUGWJ2Q2bLomTStjMdOCWMsDiBuvM43m45HAyF4dnV6XVah1u0+KjCqiXipqGkppaalJqYyuRk00jRbo7Am6OxbLo6nwi56hB/MKOiqe/2/UIf5hen5VR0q/6V/wmMHrVssnjbWsuDdwYrWCCTDk56N+OLoSSfK0kkZ4tPZaVtRPWghiJ0SxLTaWUrU8u9PA09hHA44fJxyuI6Kp7/b9Qh/mFHRVPf7fqEP8AMLg1FmxfhNVQnMdnW0nzamnE7tbN5iZmqV/cybOlule+WS5RfJK50kjzbblz3HLieHWSV5+BP9VQ9bb9y8xHU9/t+oQ/zCnoqfv9z1KAfv10dtX96r8Kr/wYLeBP9VQ9bb9yeBP9VQ9bb9yjdp++3fVYB+9Tdpf47vq9cfvE7W596r8NjB9/7iMRZp+6XNcASGljt5pGTyK9tK22a3WLmkWCAA6N9VxOMtdCxzmHygkn4if8K8u4nCGaaHN3ix7iYzIA1xAJ6gSvkHdSmfDr1uSNxjkjfWexw5tcIYiCuBW+3uJUPvJXGn0qVdOH0TyqlvExlSNpn1H3arsayDVH6lEd0StaHsA5ubnDvkOPQFxP9IzxFH8tL9Rdn3NtrG6tTbKcCaLEdhv+GQD6DzHkPblcZ/SM8RQPV00v1E07o4qFTh8eU3LpcNNepU8lt0wMyfPe5P8A2rB/td9Zi/Q22uq16NN9i9G6auwsD2xtDnZc4NGASOtw61+fe5BC6TVogwZ3WPc7yNDo8kr7D3b+OizkccPr5+dYt2oqTvVUp5dVtcph8KePB9Ac/T250MsksR0ZmisI3OPQM3hvu3Bgb/HiV8S1GYSzzSszuySyvbkYO65xIz6Cs3TPcuofk6364LUrr0timm5W8tru5jaKauSXNkC/Ufcj/sqv/sZ9UL8uL9S9ymIx6VV3xul8cbmg8y0tGCpq6qVdty+VX7oex8A7pjQdZv59+/ZauY3R2Ltu6NFW8LXukmstf0o32spxSMB3G8nGdpPyBc10dT3+36hB/MLDRX6adLapqVUqin0a+i6IrWWeFOg6fe3N0BjQ6R0kjIo2NJDRlzyAMkgc17+BXe+0/wA4U/41a7aiELK9bpCzeM00k0bInyy8WsG61zsNa0nHHm95WsyulVXq5qTSXKaW34vvKJ3iJiJfJSDt9N2ZqQQVJtT6d51GZ0FYUtyRjMEN33PDsHi4cBknB7Fz+1mi+DrtilvdIIHANfjBLXNa8Z8uHAH4ln7P7c3dOiNevIwxZLmNmiZL0TzxLmZ5cerl5FoLlt88j55nulllcXyPccuc48yVzaW1qqb9dd6uaXMKcb4cR3YWGpc7srjkjH3R2Kd0dilF6UkhEbo7F12h7dzVII60lWndZWcZKZtxOe+u8nPsSDyz6fKuSULn1GntailU3aZSc56/TCxsZmq6hJcnltWHb807y+R2MAk9QHUAMADsCxERb1CUIBEUJIIREWEgyIrssbHxRzSsikz0kbJXtjfkY9k0HB4dqx0yiSgkEREkBERJAREykgLJo1HWJBFHjJyS57g1jGNGXPc48mgAknyLGW22d9tZ8xvfqitN+67dqqtbpA97euvijbTozzsrxnefIJJI32JOPssZ9hGMndZ5cnieGmmmdI4vke6R7sbz3uL3HAxxJ4ngvNFnRbpt4Xx5v6/tCBtdmbUkVyt0cj4w+zWDwx7mB46QcHAHiOJ+VeGq3ZZZHtlmlla2STdEkr3hvEjgCeCppM7YrNeV5wyOeGR5wThrXgk4HPgF7avQfE8ykB8Mz3mKeJwkgeCScNeOGe1pwR1gLTKWozzpUetpuffDXu8GQxK9l8R3opHxuxjeje6N2OzI6uA+RbXWtQmkgotknme11Vxe18r3BxFuzguBPE8B8gWkWx1TxNDzR32uyrdjtLb/AN37tRT20aeIR2obEroROyIMe2IzDLJA7BAI6gu22c2fY2lUtVaTNYNu0+Kw6Rr297wtO7wYD7Fx4nJyBgcOK+ZZWZQ1exVDhWs2K4k9uIJ5Ig74w08Vz63SV3qWrdcS5aez7vDyaq6PeJWxU4Npt5p0VPU7daqcwxPaGgHe3XFrXPZn/K4uHoU6bqc7aVsCxONw0wzE8g3BvPGG8eAx2Lnic8Sck8STxJK2un+4r3+6l9Z63V0cNmimp8UOhS8t96lS/W+fUn8zWyyue4ve5z3u4uc9xc4nyk8SqIi6pARMokgIiZSQEREkBEyiSAiJlJARMqMpICjKhFrkSTlSqokiSUUIkiSyrlESRJZVyiJIklbfZv21nzG9+qK062+zftrPmN79UVz6t/YV+DBqcooRdDeSSTlbnZ+Q7l6PJ3HU5nOZn2Jc1zN1xHLIycHqytKttoHK75hP9Zi59U/sn7vmimrWdqUgdFSAOSys5rvIe+bDvocPlXpsxDFLdqx2nBkD5Wtkc44aAeWT1DOF9Q2t090en6n4Tr060EUgbojq4Y2aRxJ3QMElw3cEk8fb9S5dXrVb1Fu3wy5neMOacKMxPE9oWSpSpPjqhQi9KTGSy2GmXmMbLDMxz4bHRiQxODJWFjshzMgg8zkEce0c1rUWNa4lDEmw1GgIQyWOQTQT7/RSBpjdluA5r2H2rhkciRx4ErAW1vH+o0vyt36YlqVjarbpz1a+FTX6AlFCLZJZLIqokiSyhQiSJLKFCJIknKZUIkiScplQiSJKqcqiLXJC+UyqIkgvlQqokgvlQqokgsiqiSC+V0uxmiWrbp3VYHStNexA52Q1odIwtHErl13+zeq6dNp8VDUZ7FJ9W0bUctdjpBLnOAd0EhwycdnDjxIXFr67itRbpmXDxMLrEqem63nkWmJycVeqSV5HwTsMckZ3XscMFpXhldBt5rzNT1Ca3ExzInCOOIPA6QsY0N3n4/vHBPkyB1LnF02q63RS7iiqFKXXn+ZHvgtldvs5olaKrFc1CSyxmoyPpwNqMa/A4bz3knlnHAZPk4Lhl1mzm3dvTYe9ohXmiDjJEy1D0vQyHjvRnIwc8eOR8q59dbvXLaptOM5zDjOzh7OHtlJoqjma7a7RDpl6xRL+k6Esw7GMtexr258uHBal8rnBoc5zgwYaHOLg0dgzyCyNU1CS3NJZsPMs0zi+R7sAud8Q4AdQA4ABYS6bfEqKVW5cKX1fNkL5UKqLOQWWRp9YzzRQNIBmkZGCe1xAWKvSOQtIc0lrmkFpacEEciD1FRtw4cMh9Os7JU5GXtPiFuO3pEEtk2JiG1pHboc4Af3WnAwescV8wyum1Pb/AFG3XNSezmJw3ZdyOOOSZo5B72gEj6evK5bK4tDZv2qX21ctxzbjGWm1PeeY5bIyqaexfKhVRd0kLKcqiJIL5UKqJIL5UKuUSQXymVREkF8qFVMpIIREWuSBERJARESQEREkBERJAUqESQEREkBERJARESQEREkBERJARESQEREkBERJARESQEREkBERJARESQQiIoAiIgCIiAIiIAiIgCIiAIiIAiIgClEQEIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA//2Q=="
                            alt=""
                          />
                          <div class="text"></div>
                          <label for="click" id="temp">
                            x
                          </label>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              <div className="pts-icons-box-1">
                <div className="pts-icons-card-1">
                  <img src={ProfileIconGrd1} alt="ProfileIconGrd" />
                  <p>I miei Investimenti</p>
                </div>
                {/* <div className="pts-icons-card">
                  <img src={ProfileIconGrd2} alt="ProfileIconGrd" />
                  <p>I miei preferiti</p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
