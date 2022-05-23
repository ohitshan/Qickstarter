import { MailFilled, MobileFilled } from "@ant-design/icons";
import { Anchor, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateNotificationAsync } from "../../../../../Slices/userSlice";
import styles from "./Notifications.module.css";

const { Link } = Anchor;
function Notifications() {
  const user = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [Notification, setNotification]: any = useState({});

  useEffect(() => {
    setNotification(user?.authUser?.notification);
  }, [dispatch, user]);

  const onMailClick = useCallback(
    (target) => {
      setNotification((prev: any) => ({
        ...prev,
        [`${target}`]: {
          ...prev?.[`${target}`],
          mail: !prev?.[`${target}`]?.mail,
        },
      }));
      let body = {
        notification: {
          ...Notification,
          [`${target}`]: {
            ...Notification?.[`${target}`],
            mail: !Notification?.[`${target}`]?.mail,
          },
        },
      };
      dispatch(updateNotificationAsync(body));
    },
    [Notification, dispatch]
  );

  const onPhoneClick = useCallback(
    (target) => {
      setNotification((prev: any) => ({
        ...prev,
        [`${target}`]: {
          ...prev?.[`${target}`],
          phone: !prev?.[`${target}`]?.phone,
        },
      }));
      let body = {
        notification: {
          ...Notification,
          [`${target}`]: {
            ...Notification?.[`${target}`],
            phone: !Notification?.[`${target}`]?.phone,
          },
        },
      };
      dispatch(updateNotificationAsync(body));
    },
    [Notification, dispatch]
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Row
        style={{
          width: "90%",
          textAlign: "start",
          maxWidth: "1300px",
          marginTop: "30px",
        }}
      >
        <Col sm={8} span={24}>
          <Anchor>
            <Link href="#Notifications" title="Notifications" />
            <Link href="#Newsletters" title="Newsletters" />
          </Anchor>
        </Col>
        <Col sm={16} span={24}>
          <div id="Notifications">
            <h1 style={{ fontSize: "36px" }}>Notifications</h1>
            <div
              style={{
                borderBottom: "1px solid #D9D9D9 ",
                padding: "0px 0 50px 0",
              }}
            >
              <h2 style={{ fontWeight: "700" }}>Comments</h2>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("comment");
                    }}
                    className={
                      Notification?.comment?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("comment");
                    }}
                    className={
                      Notification?.comment?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  New replies in your active threads
                </div>
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #D9D9D9 ",
                padding: "40px 0 50px 0",
              }}
            >
              <h2 style={{ fontWeight: "700" }}>Messages</h2>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("message");
                    }}
                    className={
                      Notification?.message?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("message");
                    }}
                    className={
                      Notification?.message?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>New messages</div>
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #D9D9D9 ",
                padding: "40px 0 50px 0",
              }}
            >
              <h2 style={{ fontWeight: "700" }}>Projects you've backed</h2>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("project");
                    }}
                    className={
                      Notification?.project?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("project");
                    }}
                    className={
                      Notification?.project?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>Project updates</div>
              </div>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("newProject");
                    }}
                    className={
                      Notification?.newProject?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("newProject");
                    }}
                    className={
                      Notification?.newProject?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  New projects from creators you’ve backed
                </div>
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #D9D9D9 ",
                padding: "40px 0 50px 0",
              }}
            >
              <h2 style={{ fontWeight: "700" }}>Following</h2>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("following");
                    }}
                    className={
                      Notification?.following?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("following");
                    }}
                    className={
                      Notification?.following?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  Someone you follow has backed or launched a project
                </div>
              </div>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("followedYou");
                    }}
                    className={
                      Notification?.followedYou?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("followedYou");
                    }}
                    className={
                      Notification?.followedYou?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  Someone has followed you
                </div>
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #D9D9D9 ",
                padding: "40px 0 50px 0",
              }}
            >
              <h2 style={{ fontWeight: "700" }}>Tips for creators</h2>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("tip");
                    }}
                    className={
                      Notification?.tip?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("tip");
                    }}
                    className={
                      Notification?.tip?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  Advice and guidance to help you run your project
                </div>
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #D9D9D9 ",
                padding: "40px 0 50px 0",
              }}
            >
              <h2 style={{ fontWeight: "700" }}>Announcements</h2>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("announcement");
                    }}
                    className={
                      Notification?.announcement?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("announcement");
                    }}
                    className={
                      Notification?.announcement?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  Big Kickstarter news, plus occasional projects and events
                  chosen just for you
                </div>
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #D9D9D9 ",
                padding: "40px 0 50px 0",
              }}
            >
              <h2 style={{ fontWeight: "700" }}>Research</h2>
              <div style={{ display: "flex", fontSize: "18px" }}>
                <div>
                  <MailFilled
                    onClick={() => {
                      onMailClick("research");
                    }}
                    className={
                      Notification?.research?.mail
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />{" "}
                  <MobileFilled
                    onClick={() => {
                      onPhoneClick("research");
                    }}
                    className={
                      Notification?.research?.phone
                        ? styles.selectedIcon
                        : styles.Icon
                    }
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  Invitations to help us improve Kickstarter with your
                  participation and feedback
                </div>
              </div>
            </div>
          </div>
          <div id="Newsletters">
            <h1 style={{ fontSize: "36px" }}>Newsletters</h1>
            <div style={{ minHeight: "1000px" }}></div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Notifications;
