import { CheckCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getAllMessageAsync,
  getInboxMessageAsync,
  getSentMessageAsync,
  getUnreadMessageAsync,
} from "../../../Slices/messageSlice";
import { Writer } from "../../types";
import styles from "./Message.module.css";
import MessageForm from "./MessageForm";
const { Option } = Select;
function Message() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: { user: { authUser?: Writer } }) => state.user
  );
  const [SelectedValue, setSelectedValue] = useState("All");
  const [MessageList, setMessageList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectChange = useCallback((value) => {
    setSelectedValue(value);
  }, []);
  const selectList = ["All", "Inbox", "Sent", "Unread"];

  console.log(searchTerm);
  useEffect(() => {
    let body = {
      id: user?.authUser?._id,
    };
    switch (SelectedValue) {
      case "All":
        dispatch(getAllMessageAsync(body)).then((res: any) => {
          if (res.payload.success) {
            setMessageList(res.payload.message);
          }
        });
        break;
      case "Inbox":
        dispatch(getInboxMessageAsync(body)).then((res: any) => {
          if (res.payload.success) {
            setMessageList(res.payload.message);
          }
        });
        break;
      case "Sent":
        dispatch(getSentMessageAsync(body)).then((res: any) => {
          if (res.payload.success) {
            setMessageList(res.payload.message);
          }
        });
        break;
      case "Unread":
        dispatch(getUnreadMessageAsync(body)).then((res: any) => {
          if (res.payload.success) {
            setMessageList(res.payload.message);
          }
        });
        break;
    }
  }, [user, dispatch, SelectedValue]);

  useEffect(() => {
    let filteredMessage = MessageList?.filter(
      (message: { messageContent: string }) =>
        message?.messageContent.includes(searchTerm)
    );
    setFilteredList(filteredMessage);
  }, [searchTerm]);

  const onSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div
      style={{
        background: "#F0F0F0",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1000px", width: "90%" }}>
        <div style={{ textAlign: "start", marginBottom: "20px" }}>
          <div style={{ fontSize: "36px", fontWeight: "500" }}>Messages</div>
          <div style={{ fontSize: "14px" }}>
            Note: We do not endorse third-party services. Please report spam
            messages or unsolicited offers.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            size="large"
            className="MessageSearch"
            style={{ width: "280px" }}
            addonBefore={<SearchOutlined />}
            onChange={onSearchChange}
            value={searchTerm}
          />
          <Select
            size="large"
            style={{ width: 150, textAlign: "start" }}
            onChange={handleSelectChange}
            value={SelectedValue}
            showArrow={true}
          >
            {selectList.map((select) => (
              <Option value={select}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <div>{select}</div>
                  {SelectedValue === select && (
                    <CheckCircleFilled
                      style={{ color: "green", marginLeft: "20px" }}
                    />
                  )}
                </div>
              </Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            border: "1px solid #D9D9D9",
            boxShadow: " 1px 2px 5px 3px #D9D9D9",
            marginTop: "20px",
            height: "364px",
            background: "white",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {MessageList?.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  margin: "20px 0",
                }}
              >
                Nothing to see here.
              </div>
              <div className={styles.imageDiv}>
                <img
                  src="https://d3mlfyygrfdi2i.cloudfront.net/world-500px.gif"
                  alt="emptyImage"
                  style={{ width: "90%", height: "100%" }}
                />
              </div>
            </div>
          ) : (
            <div style={{ width: "100%", overflow: "auto" }}>
              {searchTerm?.length !== 0 ? (
                <div>
                  {filteredList?.map((messageInfo) => (
                    <MessageForm messageInfo={messageInfo} />
                  ))}
                </div>
              ) : (
                <div>
                  {MessageList.map((messageInfo) => (
                    <MessageForm messageInfo={messageInfo} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
