import { Outlet } from "react-router-dom";
import FollowingNav from "./FollowingNav";

function Following() {
  return (
    <div>
      <div
        style={{
          background: "#F7F7F6",
          border: "1px solid #D9D9D9 ",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            textAlign: "start",
            padding: "70px 10px",
          }}
        >
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "400",
              marginBottom: "10px",
            }}
          >
            Following
          </h1>
          <div style={{ fontSize: "18px", width: "75%" }}>
            Follow creators and Facebook friends and we'll notify you whenever
            they launch or back a new project. Learn more.
          </div>
        </div>
      </div>
      <FollowingNav />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Following;
