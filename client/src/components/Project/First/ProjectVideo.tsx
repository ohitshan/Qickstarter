import { Row, Col, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styles from "../Project.module.css";
import { useCallback, useEffect, useState } from "react";

const { Dragger } = Upload;

interface VideoProps {
  getVideoValue(video: any): void;
}

function ProjectVideo(props: VideoProps) {
  const [videos, setVideos] = useState<any>([]);
  const sendVideoValues = useCallback(() => {
    props.getVideoValue(videos);
  }, [props, videos]);

  useEffect(() => {
    sendVideoValues();
  }, [sendVideoValues]);

  const prop = {
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
        setVideos([...videos, info.file.response]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col xs={24} md={8} offset={1}>
          <h2>Project video (optional)</h2>
          <p>Add a video that describes your project.</p>
          <p>
            Tell people what you’re raising funds to do, how you plan to make it
            happen, who you are, and why you care about this project.
          </p>
          <p>
            After you’ve uploaded your video, use our editor to add captions and
            subtitles so your project is more accessible to everyone.
          </p>
        </Col>
        <Col xs={24} md={14} offset={1}>
          <Dragger {...prop}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectVideo;
