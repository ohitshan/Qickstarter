import React, { useCallback, useEffect, useState } from "react";
import { Comment, List, Input, Avatar, Form, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  commentAsync,
  getCommentsAsync,
} from "../../../../Slices/commentSlice";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentReply from "./CommentReply";
const { TextArea } = Input;
function UpdatesDetailComment() {
  const user = useAppSelector((state: any) => state?.user?.authUser);

  const dispatch = useAppDispatch();
  const projectParams = useParams();
  const [AllComments, setAllComments]: any = useState([]);
  const [comments, setComments]: any = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isBacker, setIsBacker] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    setCommentContent(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      setSubmitting(true);
      let body = {
        userId: user?._id,
        updateId: projectParams.updateID,
        content: commentContent,
      };
      dispatch(commentAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setSubmitting(false);
          setCommentContent("");
        }
      });
    },
    [commentContent, projectParams, dispatch, user]
  );
  useEffect(() => {
    let body = {
      userId: user?._id,
      updateId: projectParams.updateID,
      content: commentContent,
    };
    dispatch(getCommentsAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setComments(res.payload.Comments);
        setAllComments(res.payload.comments);
      }
    });

    user?.history?.forEach((item: any) => {
      if (item?.backingdata?.id === projectParams.postID) {
        console.log("1");
        setIsBacker(true);
      }
      // else {
      //   console.log("2");
      //   setIsBacker(false);
      // }
    });
  }, [commentContent, projectParams, user, dispatch]);
  console.log(user?.history?.[0]?.backingdata?.id, projectParams.postID);
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Comments</h2>
      {isBacker ? (
        <Comment
          avatar={
            <Avatar
              src={
                `http://localhost:5000/${user?.authUser?.image?.[0]?.filePath}` ||
                "https://joeschmoe.io/api/v1/random"
              }
              alt="Han Solo"
            />
          }
          content={
            <>
              <Form.Item>
                <TextArea
                  rows={4}
                  onChange={handleChange}
                  value={commentContent}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={submitting}
                  onClick={onSubmit}
                  type="primary"
                >
                  Add Comment
                </Button>
              </Form.Item>
            </>
          }
        />
      ) : (
        <div
          style={{
            background: "#F7F7F6",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            minHeight: "40px",
            alignItems: "center",
          }}
        >
          Only backers can post comments.
        </div>
      )}
      <br />
      <List
        className="comment-list"
        header={`${AllComments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        style={{ background: "#F7F7F6 ", padding: "20px" }}
        renderItem={(item: any) => (
          <li>
            <CommentForm item={item} isBacker={isBacker} />
            <CommentReply item={item} isBacker={isBacker} />
          </li>
        )}
      />
    </div>
  );
}

export default UpdatesDetailComment;
