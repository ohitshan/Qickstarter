import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, List, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import styles from "../PostCardDetailSection.module.css";
import { Avatar, Image } from "antd";
import {
  getLikeAsync,
  likeAsync,
  unLikeAsync,
} from "../../../../Slices/likeSlice";
import UpdatesDetailComment from "./UpdatesDetailComment";

interface updateType {
  id: number;
  description: string;
  title: string;
}

function UpdatesDetail() {
  const dispatch = useAppDispatch();
  const projectId = useParams();
  const updates = useAppSelector(
    (state: any) => state?.post?.getpost?.[0]?.updates
  );
  const projectWriter = useAppSelector(
    (state: any) => state?.post?.getpost?.[0]?.writer
  );
  const user = useAppSelector((state: any) => state?.user?.authUser);
  const [likeCliked, setLikeCliked] = useState(false);
  const [index, setIndex] = useState<number>(-1);
  const [Update, setUpdate] = useState<updateType>({
    id: 0,
    description: "",
    title: "",
  });
  const [likeInfo, setLikeInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    updates?.forEach((item: updateType, i: number) => {
      if (item.id === Number(projectId.updateID)) {
        setIndex(i);
        setUpdate(item);
      }
    });
  }, [projectId, updates]);

  useEffect(() => {
    let body = {
      updateId: projectId.updateID,
    };
    dispatch(getLikeAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setLikeInfo(res.payload.likes);

        if (res.payload.likes.find((x: any) => x.userId._id === user?._id)) {
          setLikeCliked(true);
        } else {
          setLikeCliked(false);
        }
      }
    });
  }, [dispatch, projectId, user, likeCliked]);
  const onLikeClick = useCallback(() => {
    let body = {
      updateId: projectId.updateID,
      userId: user?._id,
    };
    if (!likeCliked) {
      dispatch(likeAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setLikeCliked(true);
        }
      });
    } else {
      dispatch(unLikeAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setLikeCliked(false);
        }
      });
    }
  }, [dispatch, projectId, user, likeCliked]);

  return (
    <div
      className={styles.updatesComponentContainer}
      style={{ padding: "30px", textAlign: "start", minHeight: "900px" }}
    >
      <Link to={`/post/${projectId.postID}/updates`}>
        <Button style={{ height: "45px", fontWeight: "bold" }}>
          <LeftOutlined /> All updates
        </Button>
      </Link>
      <div style={{ marginTop: "30px", width: "70%" }}>
        <div style={{ color: "gray" }}>UPDATE #{index + 1}</div>
        <h1>{Update?.title}</h1>
        <div style={{ display: "flex" }}>
          <Avatar
            src={
              <Image
                src={
                  projectWriter?.image?.length === 0
                    ? "https://joeschmoe.io/api/v1/random"
                    : `http://localhost:5000/${projectWriter?.image?.[0]?.filePath}`
                }
                style={{ width: 32 }}
              />
            }
          />
          <div style={{ width: 32, marginLeft: "10px" }}>
            <Link to={`/profile/${projectWriter?._id}`}>
              {projectWriter?.email}
            </Link>
            <div>
              {new Date(Number(Update?.id)).getDate()},
              {new Date(Number(Update?.id)).getMonth()},
              {new Date(Number(Update?.id)).getFullYear()}
            </div>
          </div>
        </div>
        <hr />
        <div
          // className={sectionStyles.contentHover}
          dangerouslySetInnerHTML={{ __html: Update.description }}
        ></div>
        <hr />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={onLikeClick}
            style={likeCliked ? { background: "gray" } : { background: "none" }}
          >
            ♥Like
          </Button>
          <div>
            <span onClick={showModal} className={styles.likeUserList}>
              {likeInfo.length} people
            </span>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div
                id="scrollableDiv"
                style={{
                  height: 400,
                  overflow: "scroll",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
              >
                <List
                  dataSource={likeInfo}
                  renderItem={(item: any) => (
                    <List.Item key={item.userId._id}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={
                              item?.userId?.image?.length === 0
                                ? "https://joeschmoe.io/api/v1/random"
                                : `http://localhost:5000/${item?.userId?.image?.[0]?.filePath}`
                            }
                          />
                        }
                        title={
                          <a href="https://ant.design">{item.userId._id}</a>
                        }
                        description={item.userId.email}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Modal>{" "}
            like this update
          </div>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            to={`/post/${projectId.postID}/updates/${updates?.[index - 1]?.id}`}
          >
            <Button
              style={{ height: "45px", fontWeight: "bold" }}
              disabled={updates?.[index - 1]?.id ? false : true}
            >
              <LeftOutlined /> Previous
            </Button>
          </Link>
          <Link
            to={`/post/${projectId.postID}/updates/${updates?.[index + 1]?.id}`}
          >
            <Button
              style={{ height: "45px", fontWeight: "bold" }}
              disabled={updates?.[index + 1]?.id ? false : true}
            >
              <RightOutlined /> Next
            </Button>
          </Link>
        </div>
      </div>
      <div style={{ width: "70%" }}>
        <UpdatesDetailComment />
      </div>
    </div>
  );
}

export default UpdatesDetail;
