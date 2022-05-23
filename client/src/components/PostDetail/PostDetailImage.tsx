import React, { useEffect, useState } from "react";
import { Image } from "antd";
import styles from "./PostDetail.module.css";

function PostDetailImage(props: any) {
  const [filePath, setFilePath] = useState();
  useEffect(() => {}, []);
  // console.log(props.post?.images[0].filePath);
  // console.log(props.post?.videos[0].filePath);
  return (
    <div style={{ marginTop: "30px", padding: "30px" }}>
      {props.post?.videos.length > 0 ? (
        <video
          style={{ width: "100%", maxHeight: "500px" }}
          src={`http://localhost:5000/${props.post?.videos[0]?.filePath}`}
          controls
        />
      ) : props.post?.images.length ? (
        <Image
          src={`http://localhost:5000/${props.post?.images[0]?.filePath}`}
        />
      ) : (
        <div>no pic</div>
      )}
    </div>
  );
}

export default PostDetailImage;
