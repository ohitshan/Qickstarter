import { Avatar, Col, Empty, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAllMyCommentsAsync } from "../../../Slices/commentSlice";
import { getAllmyLikesAsync } from "../../../Slices/likeSlice";
import { getBackedPostsAsync } from "../../../Slices/postSlice";
import styles from "../ViewAll/MyProjects.module.css";

function Activity() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state?.user);
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [projectCreatedAt, setProjectCreatedAt] = useState<string[]>([]);
  const [projectList, setProjectList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  useEffect(() => {
    let projectList: string[] = [];
    let projectcreated: string[] = [];
    user?.authUser?.history?.forEach(
      (item: { backingdata: { id: string }; backingdate: string }) => {
        projectList.push(item?.backingdata?.id);
        projectcreated.push(item?.backingdate);
        setProjectIds(projectList);
        setProjectCreatedAt(projectcreated);
      }
    );
  }, [user]);
  useEffect(() => {
    let body = {
      id: projectIds,
    };
    if (projectIds.length !== 0) {
      dispatch(getBackedPostsAsync(body)).then((res: any) =>
        setProjectList(res.payload.posts)
      );
    }
    let likebody = {
      userId: user?.authUser?._id,
    };
    dispatch(getAllmyLikesAsync(likebody)).then((res: any) => {
      if (res.payload.success) {
        setLikeList(
          res.payload.likes.filter(
            (item: { updateId: string }) => !item?.updateId
          )
        );
      }
    });

    console.log(likebody);
    dispatch(getAllMyCommentsAsync(likebody)).then((res: any) => {
      console.log(likebody);
      if (res.payload.success) {
        setCommentLists(
          res.payload.comments.filter(
            (item: { updateId: string }) => !item?.updateId
          )
        );
      }
    });
  }, [dispatch, projectIds, user]);
  console.log(CommentLists);
  return (
    <div
      style={{
        background: "#F0F0F0",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1000px", width: "100%" }}>
        <ul className={styles.navli}>
          <li>
            <Link to={"/Activity"}>Activity</Link>
          </li>
          <li>
            <Link to={"/myBacked"}>Backed projects</Link>
          </li>
          <li>
            <Link to={"/myProject"}>Created projects</Link>
          </li>
          <li>
            <Link to={"/settings/Account"}>Settings</Link>
          </li>
          <li>
            <Link to={`/profile/${user?.authUser?._id}`}>Profile</Link>
          </li>
        </ul>
        <div style={{ textAlign: "start" }}>
          <div style={{ fontSize: "48px", fontWeight: "600" }}>Activity</div>
          <div style={{ fontSize: "24px" }}>
            A place to keep track of all your activity
          </div>
        </div>

        <div style={{ maxWidth: "1000px" }}>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <Col span={8} style={{ textAlign: "start" }}>
              <h1>Projects You Backed</h1>
            </Col>
            <Col
              span={16}
              style={{
                height: "180px",
                overflow: "auto",
                background: "#9FD0D7",
                padding: "20px",
              }}
            >
              {projectList?.map((backposts: any, i) => (
                <Link to={`/post/${backposts?._id}`} key={backposts?._id}>
                  <div
                    style={{
                      padding: "10px",
                      textAlign: "start",
                    }}
                  >
                    {projectList.length === 0 ? (
                      <div>
                        <Empty />
                      </div>
                    ) : (
                      <div>
                        <Avatar
                          src={`http://localhost:5000/${backposts?.images?.[0]?.filePath}`}
                        />
                        <span style={{ marginLeft: "20px" }}>
                          You Backed this Project
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          at {new Date(projectCreatedAt[i]).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <Col span={8} style={{ textAlign: "start" }}>
              {" "}
              <h1>Projects You like</h1>
            </Col>
            <Col
              span={16}
              style={{
                height: "180px",
                overflow: "auto",
                background: "#9FD0D7",
                padding: "20px",
              }}
            >
              {likeList?.map((likeInfo: any, i) => (
                <Link to={`/post/${likeInfo?.postId?._id}`} key={likeInfo?._id}>
                  <div
                    style={{
                      padding: "10px",
                      textAlign: "start",
                    }}
                  >
                    {likeList.length === 0 ? (
                      <div>
                        <Empty />
                      </div>
                    ) : (
                      <div>
                        <Avatar
                          src={`http://localhost:5000/${likeInfo?.postId?.images?.[0]?.filePath}`}
                        />
                        <span style={{ marginLeft: "20px" }}>
                          You liked this Project
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          at {new Date(likeInfo?.createdAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </Col>
          </Row>
          <Row
            style={{ display: "flex", alignItems: "center", margin: "20px 0" }}
          >
            <Col span={8} style={{ textAlign: "start" }}>
              <h1>Comments you've left</h1>
            </Col>
            <Col
              span={16}
              style={{
                height: "180px",
                overflow: "auto",
                background: "#9FD0D7",
                padding: "20px",
              }}
            >
              {" "}
              {CommentLists?.map((CommentInfo: any, i) => (
                <Link to={`/post/${CommentInfo?.postId?._id}`} key={i}>
                  <div
                    style={{
                      padding: "10px",
                      textAlign: "start",
                    }}
                  >
                    {CommentLists.length === 0 ? (
                      <Empty />
                    ) : (
                      <div>
                        <Avatar
                          src={`http://localhost:5000/${CommentInfo?.postId?.images?.[0]?.filePath}`}
                        />
                        <span style={{ marginLeft: "20px" }}>
                          You left comment at{" "}
                          {CommentInfo?.postId?.title?.title}
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          at {new Date(CommentInfo?.createdAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Activity;
