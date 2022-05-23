import { Button, message, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { blockedAsync } from "../../../Slices/blockSlice";
import { messageAsync, readMessageAsync } from "../../../Slices/messageSlice";
import { Writer } from "../../types";
import styles from "./Message.module.css";

interface MessageInfoProps {
  messageInfo: {
    _id: string;
    userFrom: Writer;
    userTo: Writer;
    isRead: boolean;
    messageContent: string;
    createdAt: any;
  };
}

function MessageForm({ messageInfo }: MessageInfoProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: { user: { authUser?: Writer } }) => state.user
  );
  const [CreatedDate, setCreatedDate] = useState(new Date(Date.now()));
  const [Clicked, setClicked] = useState(false);
  const [TextMessage, setTextMessage] = useState("");
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  console.log(messageInfo);
  useEffect(() => {
    const timeStamp = Date.parse(messageInfo?.createdAt);
    const createdAt = new Date(timeStamp);
    setCreatedDate(createdAt);

    let blockBody = {
      userId: messageInfo?._id,
      blockTarget: user?.authUser?._id,
    };
    dispatch(blockedAsync(blockBody)).then((res: any) => {
      if (res.payload.success) {
        setIsBlocked(res.payload.blocked);
      }
    });
  }, [messageInfo, user, dispatch]);

  const onClick = useCallback(() => {
    setClicked(!Clicked);
    let body = {
      id: messageInfo?._id,
    };
    if (
      !messageInfo?.isRead &&
      messageInfo?.userTo?._id === user?.authUser?._id
    ) {
      dispatch(readMessageAsync(body));
    }
  }, [Clicked, dispatch, messageInfo, user]);

  const handleContactOk = () => {
    setIsContactVisible(false);
  };

  const handleContactCancel = () => {
    setIsContactVisible(false);
  };

  const MessageChange = useCallback((e) => {
    setTextMessage(e.target.value);
  }, []);

  const sendMessage = useCallback(() => {
    let body = {
      userTo: messageInfo?.userFrom?._id,
      userFrom: user?.authUser?._id,
      messageContent: TextMessage,
    };
    dispatch(messageAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setIsContactVisible(false);
        setTextMessage("");
        message.success("Success");
        setClicked(false);
      }
    });
  }, [dispatch, user, TextMessage, messageInfo]);

  const contactMe = useCallback(() => {
    if (!user?.authUser?.isAuth) return;
    if (isBlocked) return;
    setIsContactVisible(true);
  }, [user, isBlocked]);

  return (
    <div
      className={styles.messageFormDiv}
      style={
        messageInfo?.userFrom?._id === user?.authUser?._id
          ? messageInfo?.userTo?._id === user?.authUser?._id
            ? { background: "#E7EAD9" }
            : { background: "#788072" }
          : messageInfo?.isRead
          ? { background: "#E7EAD9" }
          : {}
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <div>
          <div>
            From : {messageInfo?.userFrom?.name || messageInfo?.userFrom?.email}
          </div>
          <div>
            To : {messageInfo?.userTo?.name || messageInfo?.userTo?.email}
          </div>
        </div>
        <div>
          <div>{CreatedDate.toLocaleString()}</div>
          {messageInfo?.isRead ? (
            <div style={{ textAlign: "end", fontWeight: "700" }}>Read</div>
          ) : (
            <div style={{ textAlign: "end" }}>
              {messageInfo?.userFrom?._id === user?.authUser?._id ? (
                <span>
                  Unread by{" "}
                  {messageInfo?.userTo?.name || messageInfo?.userTo?.email}
                </span>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={
          Clicked ? styles.ClickedMessageContentDiv : styles.messageContentDiv
        }
        onClick={onClick}
      >
        {messageInfo?.messageContent?.split("\n")?.map((line: any) => (
          <span>
            {line}
            <br />
          </span>
        ))}
      </div>
      <div style={{ textAlign: "end" }}>
        {Clicked ? (
          <div>
            <Button
              style={{
                border: "none",
                width: "100%",
                height: "40px",
                marginTop: "20px",
                fontSize: "16px",
                color: "#037362",
              }}
              onClick={contactMe}
            >
              Reply
            </Button>
            <Modal
              visible={isContactVisible}
              onOk={handleContactOk}
              onCancel={handleContactCancel}
              footer={null}
              centered={true}
              maskStyle={{ background: "white", opacity: "0.8" }}
            >
              <div style={{ textAlign: "start" }}>
                <div style={{ fontSize: "18px", textAlign: "center" }}>
                  Send a message to{" "}
                  {messageInfo?.userFrom?.name || messageInfo?.userFrom?.email}
                </div>
                <div>
                  To:
                  {messageInfo?.userFrom?.name || messageInfo?.userFrom?.email}
                </div>
                <TextArea
                  style={{ border: "1px solid #D9D9D9" }}
                  rows={5}
                  placeholder={"Type your message here"}
                  onChange={MessageChange}
                  value={TextMessage}
                />
                {TextMessage.length !== 0 && (
                  <Button className={styles.sendButton} onClick={sendMessage}>
                    Send Message
                  </Button>
                )}
              </div>
            </Modal>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MessageForm;
