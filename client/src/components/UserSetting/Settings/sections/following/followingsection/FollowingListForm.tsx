import { CheckOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { MyProjectAsync } from "../../../../../../Slices/postSlice";
import {
  subscribeAsync,
  subscribedAsync,
  unSubscribeAsync,
} from "../../../../../../Slices/subscribeSlice";
import { Writer } from "../../../../../types";

interface FollowingListUserInfoProps {
  item: { userTo: Writer };
}

function FollowingListForm({ item }: FollowingListUserInfoProps) {
  const dispatch = useAppDispatch();
  const [created, setCreated] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const user = useAppSelector((state: any) => state.user);
  console.log(isFollowing);
  const onSubscribe = useCallback(() => {
    let body = {
      userTo: item?.userTo?._id,
      userFrom: user?.authUser?._id,
    };
    if (isFollowing) {
      dispatch(unSubscribeAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setIsFollowing(false);
        }
      });
    } else {
      dispatch(subscribeAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setIsFollowing(true);
        }
      });
    }
  }, [dispatch, user, isFollowing, item]);

  useEffect(() => {
    let body = {
      id: item?.userTo?._id,
    };
    dispatch(MyProjectAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setCreated(res?.payload?.posts?.length);
      }
    });

    let bodysub = {
      userTo: item?.userTo?._id,
      userFrom: user?.authUser?._id,
    };

    dispatch(subscribedAsync(bodysub)).then((res: any) => {
      if (res.payload.success) {
        setIsFollowing(res.payload.subscribed);
      }
    });
  }, [dispatch, item, user]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
        width: "100%",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #D9D9D9 ",
      }}
    >
      <div style={{ display: "flex" }}>
        <Avatar
          size={80}
          style={{ background: "blue" }}
          src="https://joeschmoe.io/api/v1/random"
        />
        <div style={{ marginLeft: "10px", textAlign: "start" }}>
          <h3 style={{ marginBottom: "0" }}>
            {item?.userTo?.name || item?.userTo.email}
          </h3>
          <div>{item?.userTo?.location || "earth"}</div>
          <div>
            Backed <b>{item?.userTo?.history.length}</b> times <b>{created}</b>{" "}
            Created
          </div>
        </div>
      </div>
      <Button
        style={
          isFollowing
            ? { color: "white", background: "#037362" }
            : { color: "#037362", background: "white" }
        }
        onClick={onSubscribe}
      >
        {isFollowing ? (
          <div>
            Following <CheckOutlined />
          </div>
        ) : (
          <div>Follow</div>
        )}
      </Button>
    </div>
  );
}

export default FollowingListForm;
