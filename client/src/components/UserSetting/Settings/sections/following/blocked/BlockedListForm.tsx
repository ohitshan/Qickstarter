import { Avatar, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { blockAsync, unBlockAsync } from "../../../../../../Slices/blockSlice";
import { MyProjectAsync } from "../../../../../../Slices/postSlice";
import { Writer } from "../../../../../types";

interface BlockedListUserInfoProps {
  item: { blockTarget: Writer };
}

function BlockedListForm({ item }: BlockedListUserInfoProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [isBlocked, setIsBlocked] = useState(true);
  const [created, setCreated] = useState(0);

  useEffect(() => {
    let body = {
      id: item?.blockTarget?._id,
    };
    dispatch(MyProjectAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setCreated(res?.payload?.posts?.length);
      }
    });
  }, [dispatch, item, user]);

  const onBlock = useCallback(() => {
    let body = {
      blockTarget: item?.blockTarget?._id,
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
          src={
            `http://localhost:5000/${item?.blockTarget?.image?.[0]?.filePath}` ||
            "https://joeschmoe.io/api/v1/random"
          }
        />
        <div style={{ marginLeft: "10px", textAlign: "start" }}>
          <h3 style={{ marginBottom: "0" }}>
            {item?.blockTarget?.name || item?.blockTarget.email}
          </h3>
          <div>{item?.blockTarget?.location || "earth"}</div>
          <div>
            Backed <b>{item?.blockTarget?.history.length}</b> times{" "}
            <b>{created}</b> Created
          </div>
        </div>
      </div>
      <div>
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

export default BlockedListForm;
