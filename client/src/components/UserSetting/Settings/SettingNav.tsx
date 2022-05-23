import { Badge, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Settings.module.css";
import "./Settings.css";

function SettingNav() {
  return (
    <div style={{ width: "100%" }}>
      <Menu
        className={styles.menuStyles}
        mode="horizontal"
        defaultSelectedKeys={[
          `${
            window.location.href.split("/")[
              window.location.href.split("/").length - 1
            ]
          }`,
        ]}
      >
        <Menu.Item key="Account">
          Account
          <Link to={`/settings/Account`}></Link>
        </Menu.Item>
        <Menu.Item key="EditProfile">
          Edit Profile
          <Link to={`/settings/EditProfile`}></Link>
        </Menu.Item>
        <Menu.Item key="Notifications">
          Notifications
          <Link to={`/settings/Notifications`}></Link>
        </Menu.Item>
        <Menu.Item key="PaymentMethods">
          Payment Methods
          <Link to={`/settings/PaymentMethods`}></Link>
        </Menu.Item>
        <Menu.Item key="ShippingAddress">
          Shipping Address
          <Link to={`/settings/ShippingAddress`}></Link>
        </Menu.Item>
        <Menu.Item key="Following">
          Following
          <Link to={`/following/following`}></Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SettingNav;
