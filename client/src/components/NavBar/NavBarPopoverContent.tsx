import { PlusOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MyProjectAsync } from "../../Slices/postSlice";
import styles from "./NavBar.module.css";

interface PopoverContentProps {
  onLogout(): void;
}

function NavBarPopoverContent({ onLogout }: PopoverContentProps) {
  const user = useAppSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [myProject, setMyProject] = useState([]);
  const REST_API_KEY = "32f98e56985ea93c617ac50ceca750bf";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/logout/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    let body = {
      id: user?.authUser?._id,
    };
    dispatch(MyProjectAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setMyProject(res.payload.posts.slice(0, 3));
      }
    });
  }, [user, dispatch]);

  return (
    <div className={styles.container}>
      <Row>
        <Col span={24} lg={12}>
          <h5 style={{ fontWeight: "bolder" }}>YOUR ACCOUNT</h5>
          <ul style={{ padding: "0", marginTop: "30px" }}>
            <Link to={"/savedProjects"}>
              <li className={styles.ulhover}>Saved projects</li>
            </Link>
            <Link to={"/search"}>
              <li className={styles.ulhover}>Recommended for you</li>
            </Link>
            <Link to={"/following/following"}>
              <li className={styles.ulhover}>Following</li>
            </Link>
          </ul>
          <ul style={{ padding: "0", marginTop: "30px" }}>
            <Link to={`/profile/${user?.authUser?._id}`}>
              <li className={styles.ulhover}>Profile</li>
            </Link>
            <Link to={`/settings/Account`}>
              <li className={styles.ulhover}>Settings</li>
            </Link>
            <Link to={`/message`}>
              <li className={styles.ulhover}>Messages</li>
            </Link>
            <Link to={`/Activity`}>
              <li className={styles.ulhover}>Activity</li>
            </Link>
          </ul>
        </Col>
        <Col span={24} lg={12}>
          <h5 style={{ fontWeight: "bolder" }}>CREATED PROJECTS</h5>
          <ul style={{ padding: "0", marginTop: "30px" }}>
            {myProject?.map(
              (
                project: {
                  category: { PrimaryCategory: string };
                  images: { filePath: string }[];
                  _id: string;
                },
                i: number
              ) => (
                <Link to={`/post/${project?._id}`}>
                  <div key={i} style={{ display: "flex", margin: "10px 0" }}>
                    <img
                      style={{ marginRight: "3px" }}
                      width={"50px"}
                      src={`http://localhost:5000/${project.images?.[0].filePath}`}
                      alt="mainImage"
                    />
                    <li className={styles.MyProjecthover}>
                      {project?.category?.PrimaryCategory}
                    </li>
                  </div>
                </Link>
              )
            )}
          </ul>
          <hr color="#D9D9D9" style={{ marginTop: "40px" }} />
          <Link to={"/startaproject"}>
            <div className={styles.divHover}>
              <div
                style={{
                  width: "50px",
                  background: "gray",
                  textAlign: "center",
                }}
              >
                <PlusOutlined />
              </div>
              <div style={{ marginLeft: "10px" }}>New</div>
            </div>
          </Link>
          {myProject.length >= 3 ? (
            <Link to={"/myProject"}>
              <p className={styles.texthover} style={{ marginTop: "30px" }}>
                View all
              </p>
            </Link>
          ) : null}
        </Col>
      </Row>
      <hr color="#D9D9D9" />
      <a
        href={KAKAO_AUTH_URL}
        className={styles.texthover}
        onClick={() => {
          // window.location.reload();
          // onLogout();
        }}
      >
        Log out
      </a>
    </div>
  );
}

export default NavBarPopoverContent;
