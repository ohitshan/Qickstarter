import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function FollowingFindCreator() {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "40px 0" }}>
      <Button
        style={{
          background: "#037362",
          color: "white",
          height: "55px",
          fontSize: "18px",
          padding: "0 30px",
          fontWeight: "900",
        }}
        onClick={() => {
          navigate("/search");
        }}
      >
        Explore projects
      </Button>
    </div>
  );
}

export default FollowingFindCreator;
