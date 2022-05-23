import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";

// const { SubMenu } = Menu;

export const NavBar = () => {
  return (
    <Menu className="Menu-Container" mode="horizontal">
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
  );
};
