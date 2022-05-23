import { Row, Col, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styles from "../Project.module.css";
import { useCallback, useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";

interface ImageProps {
  getImagesValue(image: any): void;
}

const { Dragger } = Upload;
function ProjectImage(props: ImageProps) {
  const [Images, setImages]: any = useState([]);

  const sendImageValue = useCallback(() => {
    props.getImagesValue(Images);
  }, [Images, props]);

  useEffect(() => {
    sendImageValue();
  }, [sendImageValue]);

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

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col xs={24} md={8} offset={1}>
          <h2>Project image</h2>
          <p>
            Add an image that clearly represents your project. Choose one that
            looks good at different sizes—it’ll appear on your project page,
            across the Kickstarter website and mobile apps, and (when shared) on
            social channels.
          </p>
          <p>
            Your image should be at least 1024x576 pixels. It will be cropped to
            a 16:9 ratio.
          </p>
          <p>
            Avoid images with banners, badges, or text—they are illegible at
            smaller sizes, can be penalized by the Facebook algorithm, and
            decrease your chances of getting Kickstarter homepage and newsletter
            features.
          </p>
        </Col>
        <Col xs={24} md={14} offset={1}>
          <ImgCrop rotate aspect={2 / 1}>
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
          </ImgCrop>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectImage;
