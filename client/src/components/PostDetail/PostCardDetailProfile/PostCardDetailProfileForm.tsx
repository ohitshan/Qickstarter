import { Avatar, Button, Modal, Input, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { blockedAsync } from "../../../Slices/blockSlice";
import { messageAsync } from "../../../Slices/messageSlice";
import { MyProjectAsync, UploadPost } from "../../../Slices/postSlice";
import { Writer } from "../../types";
import styles from "./PostCardDetailProfileForm.module.css";

const { TextArea } = Input;
function PostCardDetailProfileForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: { user: { authUser?: Writer } }) => state.user
  );
  const post = useAppSelector(
    (state: { user: any; post: { getpost?: UploadPost[] } }) =>
      state.post?.getpost
  );
  const [myPostsNumber, setMyPostsNumber] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [TextMessage, setTextMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleContactOk = () => {
    setIsContactVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleContactCancel = () => {
    setIsContactVisible(false);
  };

  const contactMe = useCallback(() => {
    if (!user?.authUser?._id) return;
    if (isBlocked) return;
    setIsContactVisible(true);
  }, [user, isBlocked]);

  const MessageChange = useCallback((e) => {
    setTextMessage(e.target.value);
  }, []);

  const sendMessage = useCallback(() => {
    let body = {
      userTo: post?.[0]?.writer?._id,
      userFrom: user?.authUser?._id,
      messageContent: TextMessage,
    };
    dispatch(messageAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setIsContactVisible(false);
        setTextMessage("");
        message.success("Success");
      }
    });
  }, [dispatch, post, user, TextMessage]);

  useEffect(() => {
    let body = {
      id: post?.[0]?.writer?._id,
    };
    let blockBody = {
      userId: post?.[0]?.writer?._id,
      blockTarget: user?.authUser?._id,
    };
    dispatch(MyProjectAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setMyPostsNumber(res.payload.posts.length);
      }
    });
    dispatch(blockedAsync(blockBody)).then((res: any) => {
      if (res.payload.success) {
        setIsBlocked(res.payload.blocked);
      }
    });
  }, [dispatch, post, user]);
  return (
    <div style={{ textAlign: "center" }} className={styles.profileContainer}>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        width={"50%"}
      >
        <div style={{ textAlign: "start", minHeight: "500px" }}>
          <div style={{ fontSize: "18px", textAlign: "center" }}>
            About the creator
          </div>
          <br />
          <br />
          <div style={{ padding: "30px", overflow: "auto" }}>
            <div style={{ fontSize: "28px", fontWeight: "600" }}>
              {post?.[0]?.writer?.name || post?.[0]?.writer?.email}
            </div>
            <div>{post?.[0]?.writer?.location}</div>
            <br />
            <p>{post?.[0]?.writer?.biography}</p>
            <Button
              key="back"
              onClick={contactMe}
              style={{
                background: "#5555FF",
                color: "white",
                width: "150px",
                height: "50px",
              }}
            >
              Contact me
            </Button>
          </div>
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
                {post?.[0]?.writer?.name || post?.[0]?.writer?.email}
              </div>
              <div>
                To:{post?.[0]?.writer?.name || post?.[0]?.writer?.email}
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
      </Modal>
      <div onClick={showModal}>
        <Avatar
          src={
            post?.[0]?.writer?.image.length === 0
              ? "https://joeschmoe.io/api/v1/random"
              : `http://localhost:5000/${post?.[0]?.writer?.image?.[0]?.filePath}`
          }
          size={50}
          style={{ top: "15px" }}
        />
        <div style={{ border: "1px solid #D9D9D9", padding: "20px 0" }}>
          <div>{post?.[0]?.writer?.name || post?.[0]?.writer?.email}</div>
          <div>
            {myPostsNumber}created·backed {post?.[0]?.writer?.history.length}{" "}
            times
          </div>
          <div style={{ padding: "20px", width: "100%", textAlign: "start" }}>
            {post?.[0]?.writer?.biography?.length! > 100 ? (
              <div
                style={{
                  width: "100%",
                  wordBreak: "break-all",
                }}
              >
                {post?.[0]?.writer?.biography?.slice(0, 150)}...
                <b style={{ color: "#037362 " }}>See more</b>
              </div>
            ) : (
              <div>{post?.[0]?.writer?.biography?.slice(0, 100)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCardDetailProfileForm;
