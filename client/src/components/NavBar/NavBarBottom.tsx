import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";

// const { SubMenu } = Menu;

export const NavBarBottom = () => {
  return (
    <div
      style={{
        border: "1px solid #D9D9D9",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Menu
        mode="horizontal"
        style={{
          maxWidth: "1400px",
          textAlign: "start",
          width: "100%",
          color: "gray",
        }}
      >
        <Menu.Item key="Arts">
          Arts
          <Link to="/Art"></Link>
        </Menu.Item>
        <Menu.Item key="Comics">
          Comics & Illustration
          <Link to="/Comics&Illustration"></Link>
        </Menu.Item>
        <Menu.Item key="Design">
          Design & Tech
          <Link to="/Design&Tech"></Link>
        </Menu.Item>
        <Menu.Item key="Film">
          Film
          <Link to="/Film"></Link>
        </Menu.Item>
        <Menu.Item key="Food">
          Food & Craft
          <Link to="/Food&Craft"></Link>
        </Menu.Item>
        <Menu.Item key="Games">
          Games
          <Link to="/Games"></Link>
        </Menu.Item>
        <Menu.Item key="Music">
          Music
          <Link to="/Music"></Link>
        </Menu.Item>
        <Menu.Item key="Publishing">
          Publishing
          <Link to="/Publishing"></Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
