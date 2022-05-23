import { Badge, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getBackedPostsAsync } from "../../../Slices/postSlice";
import { Writer } from "../../types";

export interface userIdprops {
  UserId: Writer | undefined;
}

function ProfileNav({ UserId }: userIdprops) {
  const user = useAppSelector((state: any) => state.user);
  const [projectList, setProjectList] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let projectIds: string[] = [];
    UserId?.history?.forEach((item: { backingdata: { id: string } }) => {
      projectIds.push(item?.backingdata?.id);
    });
    let body = {
      id: projectIds,
    };
    if (projectIds.length !== 0) {
      dispatch(getBackedPostsAsync(body)).then((res: any) =>
        setProjectList(res.payload.posts)
      );
    }
  }, [dispatch, user, UserId]);
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
      {" "}
      <Menu
        mode="horizontal"
        style={{
          padding: "10px 0",
          color: "gray",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        // defaultSelectedKeys={[
        //   `${
        //     window.location.href.split("/")[
        //       window.location.href.split("/").length - 1
        //     ]
        //   }`,
        // ]}
      >
        <Menu.Item key="about">
          About
          <Link to={`/profile/${UserId?._id}/about`}></Link>
        </Menu.Item>
        {user?.authUser?._id === UserId?._id || UserId?.history.length !== 0 ? (
          <Menu.Item key="backed">
            <Badge count={projectList?.length} offset={[10, 0]} size={"small"}>
              Backed
            </Badge>
            <Link to={`/profile/${UserId?._id}/backed`}></Link>
          </Menu.Item>
        ) : null}
        {/* <Menu.Item key="PaymentMethods">
          Payment Methods
          <Link to={`/settings/PaymentMethods`}></Link>
        </Menu.Item>
        <Menu.Item key="ShippingAddress">
          Shipping Address
          <Link to={`/settings/ShippingAddress`}></Link>
        </Menu.Item> */}
      </Menu>
    </div>
  );
}

export default ProfileNav;
