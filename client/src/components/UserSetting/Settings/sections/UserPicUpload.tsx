import React, { useCallback, useEffect, useState } from "react";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface ImageProps {
  getImageValue(Image: []): void;
}

function UserPicUpload({ getImageValue }: ImageProps) {
  const [Images, setImages]: any = useState([]);

  const sendImageValue = useCallback(() => {
    getImageValue(Images);
  }, [Images, getImageValue]);

  useEffect(() => {
    sendImageValue();
  }, [Images]);

  console.log(Images);
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
        setImages(info.file.response);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <ImgCrop rotate aspect={1 / 1}>
        <Dragger
          {...prop}
          maxCount={1}
          // showUploadList={false}
          style={{ borderRadius: "10px" }}
        >
          <div style={{ padding: "5px" }}>
            <p
              className="ant-upload-drag-icon"
              style={{ height: "20px", margin: " 0 0 10px 0" }}
            >
              <InboxOutlined style={{ fontSize: "20px" }} />
            </p>
            <p className="ant-upload-text" style={{ fontSize: "10px" }}>
              Click or drag file to this area to upload ( PNG, JPEG only)
            </p>
          </div>
        </Dragger>
      </ImgCrop>
    </div>
  );
}

export default UserPicUpload;
