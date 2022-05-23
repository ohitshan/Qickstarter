import { HeartFilled, MessageFilled, RightOutlined } from "@ant-design/icons";
import { Avatar, Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getCommentsAsync } from "../../../../Slices/commentSlice";
import { getLikeAsync } from "../../../../Slices/likeSlice";
import sectionStyles from "../PostCardDetailSection.module.css";

function UpdateForm({ item, index, isOwner, onDeleteUpdate }: any) {
  const projectWriter = useAppSelector(
    (state: any) => state?.post?.getpost?.[0]?.writer
  );
  const dispatch = useAppDispatch();
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    let body = {
      updateId: item.id,
    };
    dispatch(getCommentsAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setCommentCount(res.payload.comments.length);
      }
    });
    dispatch(getLikeAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setLikeCount(res.payload.likes.length);
      }
    });
  }, [dispatch, item]);
  return (
    <div
      style={{
        margin: "30px 0",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: "gray",
            textAlign: "start",
            marginBottom: "5px",
          }}
        >
          UPDATE #{index + 1}
        </div>
        {isOwner && (
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => {
              onDeleteUpdate(item);
            }}
          >
            Delete
          </Button>
        )}
      </div>
      <Link to={`${item.id}`}>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            // marginBottom: "40px",
            textAlign: "start",
          }}
          className={sectionStyles.contentContainer}
        >
          <h1>{item.title}</h1>
          <div style={{ display: "flex" }}>
            <Avatar
              src={
                <Image
                  src="https://joeschmoe.io/api/v1/random"
                  style={{ width: 32 }}
                />
              }
            />
            <div>
              {projectWriter?.email}
              <div>
                {new Date(Number(item?.id)).getDate()},
                {new Date(Number(item?.id)).getMonth()},
                {new Date(Number(item?.id)).getFullYear()}
              </div>
            </div>
          </div>
          <hr />
          <div
            className={sectionStyles.contentHover}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span>
                <MessageFilled /> {commentCount}
              </span>
              <span style={{ marginLeft: "20px" }}>
                <HeartFilled /> {likeCount}
              </span>
            </div>
            <Button>
              Read more <RightOutlined />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UpdateForm;
