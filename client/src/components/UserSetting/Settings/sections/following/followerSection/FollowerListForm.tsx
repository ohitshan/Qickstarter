import { CheckOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { blockAsync, unBlockAsync } from "../../../../../../Slices/blockSlice";
import { MyProjectAsync } from "../../../../../../Slices/postSlice";
import {
  subscribeAsync,
  subscribedAsync,
  unSubscribeAsync,
} from "../../../../../../Slices/subscribeSlice";
import { Writer } from "../../../../../types";

interface FollowerListUserInfoProps {
  item: { userFrom: Writer };
}

function FollowerListForm({ item }: FollowerListUserInfoProps) {
  const dispatch = useAppDispatch();
  const [created, setCreated] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const user = useAppSelector((state: any) => state.user);
  console.log(isFollowing);
  const onSubscribe = useCallback(() => {
    let body = {
      userTo: item?.userFrom?._id,
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

  const onBlock = useCallback(() => {
    let body = {
      blockTarget: item?.userFrom?._id,
      userId: user?.authUser?._id,
    };
    if (isBlocked) {
      dispatch(unBlockAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setIsBlocked(false);
        }
      });
    } else {
      dispatch(blockAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setIsBlocked(true);
        }
      });
    }
  }, [item, user, dispatch, isBlocked]);

  useEffect(() => {
    let body = {
      id: item?.userFrom?._id,
    };
    dispatch(MyProjectAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setCreated(res?.payload?.posts?.length);
      }
    });

    let bodysub = {
      userTo: item?.userFrom?._id,
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
            {item?.userFrom?.name || item?.userFrom.email}
          </h3>
          <div>{item?.userFrom?.location || "earth"}</div>
          <div>
            Backed <b>{item?.userFrom?.history.length}</b> times{" "}
            <b>{created}</b> Created
          </div>
        </div>
      </div>
      <div>
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
        <Button
          style={
            isBlocked
              ? { color: "white", background: "gray" }
              : { color: "#037362", background: "white" }
          }
          onClick={onBlock}
        >
          {isBlocked ? <div>unBlock</div> : <div>Block</div>}
        </Button>
      </div>
    </div>
  );
}

export default FollowerListForm;
