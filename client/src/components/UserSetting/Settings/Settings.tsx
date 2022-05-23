import React from "react";
import { Outlet } from "react-router-dom";
import SettingNav from "./SettingNav";
import styles from "./Settings.module.css";

function Settings() {
  return (
    <div>
      <div className={styles.SettingTitle}>
        <div style={{ width: "95%", maxWidth: "1400px" }}>
          <h1 style={{ textAlign: "start", fontSize: "50px" }}>Settings</h1>
        </div>
        <div style={{ width: "95%", maxWidth: "1400px" }}>
          <SettingNav />
        </div>
      </div>
      <hr style={{ marginTop: "0" }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
