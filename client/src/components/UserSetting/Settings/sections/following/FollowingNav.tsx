import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  followerListAsync,
  followingListAsync,
} from "../../../../../Slices/subscribeSlice";

function FollowingNav() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [followingNumber, setFollowingNumber] = useState(0);
  const [followerNumber, setFollowerNumbser] = useState(0);
  useEffect(() => {
    let body = {
      userId: user?.authUser?._id,
    };
    dispatch(followingListAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setFollowingNumber(res.payload.following.length);
      }
    });

    dispatch(followerListAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setFollowerNumbser(res.payload.filtered.length);
      }
    });
  }, [user, dispatch]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #D9D9D9",
        fontSize: "16px",
        fontWeight: "600",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          textAlign: "start",
          padding: "26px 10px",
        }}
      >
        <Link to={"/following/findCreators"} style={{ color: "black" }}>
          Find creators
        </Link>
        <Divider type="vertical" style={{ margin: "0 40px", height: "24px" }} />
        <Link
          to={"/following/following"}
          style={{ color: "black", marginRight: "30px" }}
        >
          Following{"  "}
          <span
            style={{
              background: "#3D3D66",
              color: "white",
              padding: "0 5px",
            }}
          >
            {followingNumber}
          </span>
        </Link>
        <Link
          to={"/following/followers"}
          style={{ color: "black", marginRight: "30px" }}
        >
          Followers{"  "}
          <span
            style={{
              background: "#3D3D66",
              color: "white",
              padding: "0 5px",
            }}
          >
            {followerNumber}
          </span>
        </Link>
        <Link
          to={"/following/blocked"}
          style={{ color: "black", marginRight: "30px" }}
        >
          Blocked
        </Link>
      </div>
    </div>
  );
}

export default FollowingNav;
