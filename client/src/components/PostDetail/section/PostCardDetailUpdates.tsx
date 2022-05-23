import {
  BoldOutlined,
  FileImageOutlined,
  InboxOutlined,
  ItalicOutlined,
  UnorderedListOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, message, Modal, Row, Upload } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteUpdateAsync, upDatesAsync } from "../../../Slices/postSlice";
import styles from "../../Project/Project.module.css";
import UpdateForm from "./children/UpdateForm";
import sectionStyles from "./PostCardDetailSection.module.css";

function PostCardDetailUpdates() {
  const user = useAppSelector((state: any) => state.user);
  const post = useAppSelector((state: any) => state.post);

  const [updateList, setUpdateList] = useState([]);

  const Divref: any = useRef(null);
  const dispatch = useAppDispatch();
  const [Title, setTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [Images, setImages] = useState<any>([]);
  const [Videos, setVideos] = useState<any>([]);
  const [onHeadline, setOnHeadline] = useState(false);
  const [isOwner, setIsOwnser] = useState(false);
  const [newUpdatesClick, setNewUpdatesClick] = useState(false);
  console.log(updateList);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  const showVideoModal = useCallback(() => {
    setIsVideoModalVisible(true);
  }, []);
  const handleVideoOk = useCallback(() => {
    setIsVideoModalVisible(false);
  }, []);

  const handleVideoCancel = useCallback(() => {
    setIsVideoModalVisible(false);
  }, []);
  const onTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onDeleteUpdate = useCallback(
    (item) => {
      let body = {
        postId: post?.getpost?.[0]?._id,
        updateId: item.id,
      };
      if (window.confirm("정말 지우시겠습니까?")) {
        dispatch(deleteUpdateAsync(body));
      }
    },
    [dispatch, post]
  );

  const onUpdates = useCallback(() => {
    let body = {
      postId: post?.getpost?.[0]?._id,
      title: Title,
      descrip: Divref?.current?.innerHTML,
      id: Date.now(),
    };
    if (window.confirm("Are you sure")) {
      dispatch(upDatesAsync(body));
      setTitle("");
      Divref.current.innerHTML = "";
    }
  }, [dispatch, post, Title]);
  useEffect(() => {
    if (post?.payload) {
      setUpdateList(post?.payload?.postInfo.updates);
    } else {
      setUpdateList(post?.getpost?.[0]?.updates);
    }
    if (user?.authUser?._id === post?.getpost?.[0]?.writer?._id) {
      setIsOwnser(true);
    } else {
      setIsOwnser(false);
    }
  }, [post, user]);

  const prop = {
    name: "file",
    multiple: true,
    action: "/api/posts/image",
    beforeUpload: (file: any) => {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      if (!isPNG && !isJPG) {
        message.error(`${file.name} is not a png,jpg file`);
      }
      return isJPG || isPNG || Upload.LIST_IGNORE;
    },
    onChange(info: {
      file: { name?: any; status?: any; response?: any };
      fileList: any;
    }) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImages([...Images, info.file.response]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const videoprop = {
    name: "file",
    multiple: true,
    action: "/api/videos/uploadVideos",
    beforeUpload: (file: any) => {
      const isMP4 = file.type === "video/mp4";

      if (!isMP4) {
        message.error(`${file.name} is not a mp4 file`);
      }
      return isMP4 || Upload.LIST_IGNORE;
    },
    onChange(info: {
      file: { name?: any; status?: any; response?: any };
      fileList: any;
    }) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.file.response);
        setVideos([...Videos, info.file.response]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  function setStyle(style: any, showDefault?: boolean, value?: string) {
    document.execCommand(style, showDefault, value);
  }

  return (
    <div className={sectionStyles.updatesComponentContainer}>
      <div style={{ width: "50%" }}>
        {isOwner && (
          <div>
            <Row align="middle" justify="center">
              <Col>
                <h2>Project Updates</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible, include images to show them what your project is
                  all about and what rewards look like. Read more about telling
                  your story
                </p>
                <Button
                  onClick={() => {
                    setNewUpdatesClick(!newUpdatesClick);
                  }}
                >
                  New Update
                </Button>
                {newUpdatesClick && (
                  <div>
                    <label style={{ textAlign: "start" }}>
                      <h1>Title</h1>
                    </label>
                    <Input
                      style={{ marginBottom: "20px" }}
                      onChange={onTitleChange}
                      value={Title}
                    />
                    <h1 style={{ textAlign: "start" }}>Content</h1>
                    <div
                      style={{
                        width: "100%",
                        height: "40px",
                        textAlign: "start",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setOnHeadline(!onHeadline);
                          if (onHeadline) {
                            setStyle("fontSize", true, "3");
                          } else {
                            setStyle("fontSize", true, "6");
                          }
                        }}
                        className={styles.hoverAction}
                      >
                        Headline
                      </Button>

                      <Button
                        onClick={() => {
                          setStyle("insertUnorderedList");
                        }}
                        className={styles.hoverAction}
                      >
                        <UnorderedListOutlined />
                      </Button>
                      <Button
                        onClick={() => {
                          setStyle("bold");
                        }}
                        className={styles.hoverAction}
                      >
                        <BoldOutlined />
                      </Button>
                      <Button
                        onClick={() => {
                          setStyle("italic");
                        }}
                        className={styles.hoverAction}
                      >
                        <ItalicOutlined />
                      </Button>
                      <Button
                        onClick={showModal}
                        className={styles.hoverAction}
                      >
                        <FileImageOutlined />
                      </Button>
                      <Button
                        onClick={showVideoModal}
                        className={styles.hoverAction}
                      >
                        <VideoCameraOutlined />
                      </Button>
                    </div>

                    <Modal
                      title="image"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      {/* <ImgCrop rotate> */}
                      <Dragger {...prop}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload. Strictly prohibit
                          from uploading company data or other band files
                        </p>
                      </Dragger>
                      {/* </ImgCrop> */}
                    </Modal>
                    <Modal
                      title="video"
                      visible={isVideoModalVisible}
                      onOk={handleVideoOk}
                      onCancel={handleVideoCancel}
                    >
                      {/* <ImgCrop rotate> */}
                      <Dragger {...videoprop}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload. Strictly prohibit
                          from uploading company data or other band files
                        </p>
                      </Dragger>
                      {/* </ImgCrop> */}
                    </Modal>

                    <div
                      id="editor"
                      contentEditable={true}
                      ref={Divref}
                      className={styles.hoverDiv}
                    >
                      {Images.map((image: any) => (
                        <div>
                          <img
                            style={{
                              minWidth: "300px",
                              maxWidth: "600px",
                              maxHeight: "700px",
                              width: "100%",
                              height: "100%",
                            }}
                            alt={image.title}
                            src={`http://localhost:5000/${image.filePath}`}
                          />
                        </div>
                      ))}
                      {Videos.map((video: any) => (
                        <div>
                          <video
                            style={{
                              minWidth: "300px",
                              maxWidth: "600px",
                              maxHeight: "500px",
                            }}
                            src={`http://localhost:5000/${video.filePath}`}
                            controls
                          />
                          <br />
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={onUpdates}
                      style={{
                        margin: "20px 0",
                        width: "100%",
                        background: "#028858",
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {updateList?.map((item: any, index: number) => (
            <UpdateForm
              item={item}
              key={index}
              index={index}
              isOwner={isOwner}
              onDeleteUpdate={onDeleteUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostCardDetailUpdates;
