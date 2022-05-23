import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutUserAsync } from "../../Slices/userSlice";
import { CloseOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import "./NavBar.css";
import { Popover, Button, Avatar, Row, Col, Drawer, Input, Form } from "antd";
import styles from "./NavBar.module.css";
import NavBarPopoverContent from "./NavBarPopoverContent";

export const NavHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: any) => state?.user);
  const [visible, setVisible] = useState(false);
  const [ShowDrawer, setShowDrawer] = useState(false);
  const [page, setPage] = useState(false);
  const [inputContent, setInputContent] = useState("");

  useEffect(() => {}, []);

  const onChangeContent = useCallback((e) => {
    setInputContent(e.target.value);
  }, []);

  const onLogout = () => {
    dispatch(logoutUserAsync());
  };

  const onShowDrawer = useCallback(() => {
    setShowDrawer(true);
  }, []);

  const onClose = useCallback(() => {
    setShowDrawer(false);
  }, []);

  const handleVisibleChange = useCallback((visible) => {
    setVisible(visible);
  }, []);

  return (
    <div className="navhome">
      <div className="left">
        <Link to={"/startaproject"}>
          <span>Start a project</span>
        </Link>
      </div>
      <div className="title">
        <Link to="/">KICKSTARTER</Link>
      </div>
      <div className="right" style={{ display: "flex", justifyContent: "end" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span onClick={onShowDrawer}>
            Search
            <SearchOutlined style={{ margin: "5px" }} />
          </span>
          <Drawer
            placement="top"
            closable={false}
            onClose={onClose}
            visible={ShowDrawer}
            getContainer={false}
            contentWrapperStyle={{
              height: "70px",
              width: "100%",
            }}
            mask={false}
            bodyStyle={{
              padding: 0,
              margin: 0,
              width: "100%",
            }}
          >
            <Form
              style={{ width: "100%", height: "100%" }}
              onFinish={() => {
                setShowDrawer(false);
                setInputContent("");
                navigate(`/search/${inputContent}`);
              }}
            >
              <Input
                allowClear
                onChange={onChangeContent}
                value={inputContent}
                suffix={<CloseOutlined onClick={onClose} />}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "0 30px",
                  margin: 0,
                }}
              />
            </Form>
          </Drawer>
        </div>
        {user?.authUser?.isAuth || user?.authUser?._id ? (
          <Popover
            placement="bottomRight"
            content={<NavBarPopoverContent onLogout={onLogout} />}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <Avatar
              style={{ backgroundColor: "#87d068", marginLeft: "0" }}
              icon={<UserOutlined />}
              size={40}
            />
          </Popover>
        ) : (
          // <span onClick={onLogout}>Log out</span>
          <span>
            <Link to="login">Log in</Link>
          </span>
        )}
      </div>
    </div>
  );
};
