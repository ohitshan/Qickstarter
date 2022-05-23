import { CheckOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { blockedAsync } from "../../../Slices/blockSlice";
import {
  subscribeAsync,
  subscribedAsync,
  unSubscribeAsync,
} from "../../../Slices/subscribeSlice";
import { getUserByIdAsync } from "../../../Slices/userSlice";
import { Writer } from "../../types";
import ProfileNav from "./ProfileNav";

function Profile() {
  const navigate = useNavigate();
  const paramsUserId = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [userInfo, setUserInfo] = useState<Writer>();
  const [isSubscribe, setIsSubscribe] = useState(false);
  const created = new Date(`${userInfo?.createdAt}`);

  useEffect(() => {
    let blockbody = {
      userId: paramsUserId.userId,
      blockTarget: user?.authUser?._id,
    };

    dispatch(blockedAsync(blockbody)).then((res: any) => {
      if (res.payload.success) {
        if (res.payload?.blocked) {
          navigate("/");
        }
      }
    });

    let userId = paramsUserId.userId;

    dispatch(getUserByIdAsync(userId)).then((res: any) => {
      setUserInfo(res?.payload?.[0]);
    });

    let body = {
      userTo: paramsUserId.userId,
      userFrom: user?.authUser?._id,
    };

    dispatch(subscribedAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setIsSubscribe(res.payload.subscribed);
      }
    });
  }, [dispatch, paramsUserId, user]);
  console.log(userInfo);

  const onSubscribe = useCallback(() => {
    let body = {
      userTo: paramsUserId.userId,
      userFrom: user?.authUser?._id,
    };
    if (isSubscribe) {
      dispatch(unSubscribeAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setIsSubscribe(false);
        }
      });
    } else {
      dispatch(subscribeAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setIsSubscribe(true);
        }
      });
    }
  }, [dispatch, paramsUserId, user, isSubscribe]);

  return (
    <div>
      <div style={{ background: "#F7F7F6", padding: "50px 0 30px 0" }}>
        <div>
          <Avatar
            size={150}
            src={
              `http://localhost:5000/${userInfo?.image?.[0]?.filePath}` ||
              "https://joeschmoe.io/api/v1/random"
            }
          />
        </div>
        <div>
          <h1>{userInfo?.name || userInfo?.email}</h1>
          <div>
            <span>
              Backed {userInfo?.history?.length} times · Joined{" "}
              {created?.toLocaleDateString()}
            </span>
          </div>
          <div style={{ marginTop: "15px" }}>
            {userInfo?._id === user?.authUser?._id ? null : (
              <Button
                style={
                  isSubscribe
                    ? { color: "white", background: "#037362" }
                    : { color: "#037362", background: "white" }
                }
                onClick={onSubscribe}
              >
                {isSubscribe ? (
                  <div>
                    Following <CheckOutlined />
                  </div>
                ) : (
                  <div>Follow</div>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      {userInfo?.privacy ? (
        <div>
          {userInfo?._id === paramsUserId.userId ? (
            <div>
              <ProfileNav UserId={userInfo} />
              <Outlet context={userInfo} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          <ProfileNav UserId={userInfo} />
          <Outlet context={userInfo} />
        </div>
      )}
    </div>
  );
}

export default Profile;
