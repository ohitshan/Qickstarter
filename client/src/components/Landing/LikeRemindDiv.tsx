import { DislikeOutlined, LikeOutlined, TagOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  dislikeAsync,
  getMyDislikeAsync,
  getMyLikeAsync,
  likeAsync,
  unDisLikeAsync,
  unLikeAsync,
} from "../../Slices/likeSlice";
import { remindAsync } from "../../Slices/remindSlice";
import { onRemindMeAsync } from "../../Slices/userSlice";
import { Project } from "../types";
import styles from "./LandingPage.module.css";

interface LikeRemindDivProps {
  item: Project;
}

function LikeRemindDiv({ item }: LikeRemindDivProps) {
  const [ClickedRemind, setClickedRemind] = useState(false);
  const [Clickedlike, setClickedlike] = useState(false);
  const [Clickeddislike, setClickedDislike] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);

  const onRemindClick = useCallback(() => {
    let body = {
      userId: user?.authUser?._id,
      postId: item?._id,
    };
    dispatch(onRemindMeAsync(body));
    dispatch(remindAsync(body));
  }, [dispatch, user, item]);

  useEffect(() => {
    if (
      user?.authUser?.favorites?.find(
        (element: { id: string }) => element.id === item?._id
      )
    ) {
      setClickedRemind(true);
    } else {
      setClickedRemind(false);
    }

    let body = {
      postId: item?._id,
      userId: user?.authUser?._id,
    };

    if (user?.authUser?._id) {
      dispatch(getMyLikeAsync(body)).then((res: any) => {
        if (res?.payload?.success) {
          setClickedlike(res.payload.isLiked);
        }
      });
      dispatch(getMyDislikeAsync(body)).then((res: any) => {
        if (res?.payload?.success) {
          setClickedDislike(res.payload.isDisliked);
        }
      });
    }
  }, [dispatch, item, user]);

  return (
    <div style={{ display: "flex" }}>
      <Popover
        overlayInnerStyle={{ background: "black" }}
        content={<div style={{ color: "white" }}>Remind me</div>}
        trigger="hover"
      >
        <button
          className={ClickedRemind ? styles.clickedButtons : styles.buttons}
          onClick={onRemindClick}
        >
          <TagOutlined />
        </button>
      </Popover>
      <Popover
        overlayInnerStyle={{ background: "black" }}
        content={<div style={{ color: "white" }}>More like this</div>}
        trigger="hover"
      >
        <button
          className={Clickedlike ? styles.clickedButtons : styles.buttons}
          onClick={() => {
            if (!user?.authUser?._id) return;
            if (Clickedlike) {
              dispatch(
                unLikeAsync({
                  postId: item._id,
                  userId: user?.authUser?._id,
                })
              ).then((res: any) => {
                if (res.payload.success) {
                  setClickedlike(false);
                }
              });
            } else {
              dispatch(
                likeAsync({ postId: item._id, userId: user?.authUser?._id })
              ).then((res: any) => {
                if (res.payload.success) {
                  setClickedlike(true);
                  if (Clickeddislike) {
                    dispatch(
                      unDisLikeAsync({
                        postId: item._id,
                        userId: user?.authUser?._id,
                      })
                    ).then((res: any) => {
                      if (res.payload.success) {
                        setClickedDislike(false);
                      }
                    });
                  }
                }
              });
            }
          }}
        >
          <LikeOutlined />
        </button>
      </Popover>
      <Popover
        overlayInnerStyle={{ background: "black" }}
        content={<div style={{ color: "white" }}>Less like this</div>}
        trigger="hover"
      >
        <button
          className={Clickeddislike ? styles.clickedButtons : styles.buttons}
          onClick={() => {
            if (!user?.authUser?._id) return;

            if (Clickeddislike) {
              dispatch(
                unDisLikeAsync({
                  postId: item._id,
                  userId: user?.authUser?._id,
                })
              ).then((res: any) => {
                if (res.payload.success) {
                  setClickedDislike(false);
                }
              });
            } else {
              dispatch(
                dislikeAsync({
                  postId: item._id,
                  userId: user?.authUser?._id,
                })
              ).then((res: any) => {
                if (res.payload.success) {
                  setClickedDislike(true);
                  if (Clickedlike) {
                    dispatch(
                      unLikeAsync({
                        postId: item._id,
                        userId: user?.authUser?._id,
                      })
                    ).then((res: any) => {
                      if (res.payload.success) {
                        setClickedlike(false);
                      }
                    });
                  }
                }
              });
            }
          }}
        >
          <DislikeOutlined />
        </button>
      </Popover>
    </div>
  );
}

export default LikeRemindDiv;
