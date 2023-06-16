import React, { useState } from "react";
import "../styles/components/header.css";
import { MdMenu, MdClear } from "react-icons/md";
import LogoWhite from "../assets/img/logo-white.svg";
import { Outlet, Link } from "react-router-dom";
import Pdf from "../assets/dopot.pdf";
import { SocialIcon } from "react-social-icons";
import IconDown from "../assets/img/arr-menu.svg";

//import GetAccount from "../utils/ethersUtils.js";
import { getAddr } from "../utils/firebase/retriveInfo";

const Header = (props) => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [walletText, setwalletText] = useState("Wallet");

  return (
    <header>
      <div className="box">
        {/* Header for PC */}
        <div className="header-content">
          <div className="header-left">
            <img src={LogoWhite} alt="LogoWhite" />
          </div>
          <div className="header-right">
            <a href="#">Home</a>
            <a href="#">FAQ</a>
            <a href={"/#/dopotpower"}>DS Token</a>

            <div style={{ marginRight: "1.5rem" }} class="dropdown_menu">
              <button class="dropbtn">
                Community{" "}
                <span>
                  <img className="arrow-menu-dr" src={IconDown} alt="" />{" "}
                </span>
              </button>

              <div class="dropdown-content-menu">
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://www.instagram.com/dopotfi"
                  />
                </a>
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://www.facebook.com/dopot.fi"
                  />
                </a>
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://twitter.com/Dopot_fi"
                  />
                </a>
                <a>
                  <SocialIcon
                    fgColor="white"
                    bgColor="#EE1D52"
                    url="https://www.tiktok.com/@dopotfi"
                  />
                </a>
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://www.reddit.com/user/Dopotfi/"
                  />
                </a>
                <a>
                  <SocialIcon
                    fgColor="white"
                    url="https://discord.gg/j8xxZFsyvd"
                  />
                </a>
              </div>
            </div>
            <div style={{ marginRight: "3.5rem" }} class="dropdown_menu">
              <button class="dropbtn">
                Documenti Aziendali{" "}
                <span>
                  <img
                    style={{ width: "7%" }}
                    className="arrow-menu-dr"
                    src={IconDown}
                    alt=""
                  />
                </span>
              </button>
              <div class="dropdown-content-menu">
                <a href={Pdf}>Whitepaper</a>
                <a href="https://dopot.gitbook.io/dopot/">Gitbook</a>
              </div>
            </div>
            <a href={"/#/profile"}>
              <button className="grd-btn dopot-btn-sm">Account</button>
            </a>

            <button
              className="purple-border-btn dopot-btn-sm"
              onClick={() => getAddr(setwalletText)}
            >
              {walletText}
            </button>
          </div>
        </div>
        {/* Header for Mobile Devices */}
        <div className="header-mob">
          <img src={LogoWhite} alt="LogoWhite" />
          {isHeaderOpen ? (
            <div
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(false);
              }}
            >
              <MdClear />
            </div>
          ) : (
            <div
              className="header-icon"
              onClick={() => {
                setIsHeaderOpen(true);
              }}
            >
              <MdMenu />
            </div>
          )}

          {isHeaderOpen ? (
            <div className="header-mob-box">
              <a href="#">Home</a>
              <a href="#">FAQ</a>
              <a href={"/#/dopotpower"}>DS Token</a>
              <div style={{ marginRight: "1.5rem" }} class="dropdown_menu">
                <button class="dropbtn">
                  Community{" "}
                  <span>
                    <img className="arrow-menu-dr" src={IconDown} alt="" />{" "}
                  </span>
                </button>

                <div class="dropdown-content-menu">
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://www.instagram.com/dopotfi"
                    />
                  </a>
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://www.facebook.com/dopot.fi"
                    />
                  </a>
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://twitter.com/Dopot_fi"
                    />
                  </a>
                  <a>
                    <SocialIcon
                      fgColor="white"
                      bgColor="#EE1D52"
                      url="https://www.tiktok.com/@dopotfi"
                    />
                  </a>
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://www.reddit.com/user/Dopotfi/"
                    />
                  </a>
                  <a>
                    <SocialIcon
                      fgColor="white"
                      url="https://discord.gg/j8xxZFsyvd"
                    />
                  </a>
                </div>
              </div>
              <div style={{ marginRight: "3.5rem" }} class="dropdown_menu">
                <button class="dropbtn">
                  Documenti Aziendali{" "}
                  <span>
                    <img
                      style={{ width: "7%" }}
                      className="arrow-menu-dr"
                      src={IconDown}
                      alt=""
                    />
                  </span>
                </button>
                <div class="dropdown-content-menu">
                  <a href={Pdf}>Whitepaper</a>
                  <a href="https://dopot.gitbook.io/dopot/">Gitbook</a>
                </div>
              </div>

              <button className="grd-btn dopot-btn-lg">Account</button>
              <button
                className="purple-border-btn dopot-btn-lg"
              >
                Wallet
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
