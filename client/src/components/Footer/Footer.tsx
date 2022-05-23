import {
  CarFilled,
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{
        border: "1px solid #D9D9D9",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          textAlign: "start",
          width: "100%",
          color: "gray",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div>
            <CarFilled style={{ color: "#715967 ", fontSize: "20px" }} />
            <span style={{ padding: "10px" }}>Kickstarter, PBC © 2022</span>
          </div>
          <div>
            <b>!This is Practice Page!</b>
          </div>
        </div>
        <div style={{ fontSize: "20px", textAlign: "center" }}>
          <div>
            <a
              href={"https://www.facebook.com/Kickstarter/"}
              target="_blank"
              rel="noreferrer"
            >
              <FacebookFilled style={{ color: "#715967 ", margin: "10px" }} />
            </a>
            <a
              href={"https://www.instagram.com/kickstarter/"}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramFilled style={{ color: "#715967 ", margin: "10px" }} />
            </a>
            <a
              href={"https://twitter.com/kickstarter"}
              target="_blank"
              rel="noreferrer"
            >
              <TwitterOutlined style={{ color: "#715967 ", margin: "10px" }} />
            </a>
            <a
              href={"https://www.youtube.com/user/kickstarter"}
              target="_blank"
              rel="noreferrer"
            >
              <YoutubeFilled style={{ color: "#715967 ", margin: "10px" }} />
            </a>
          </div>
          <div style={{ fontSize: "16px" }}>
            If you want to fund visit below
          </div>
          <a
            href="https://www.kickstarter.com/?ref=nav"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "16px" }}
          >
            https://www.kickstarter.com/?ref=nav
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
