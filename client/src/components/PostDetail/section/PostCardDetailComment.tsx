import React, { useCallback, useEffect, useState } from "react";
import { Comment, List, Input, Avatar, Form, Button, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { commentAsync, getCommentsAsync } from "../../../Slices/commentSlice";
import { useParams } from "react-router-dom";
import CommentForm from "./children/CommentForm";
import CommentReply from "./children/CommentReply";
import CommentMainForm from "./commentsub/CommentMainForm";
import CommentMainReply from "./commentsub/CommentMainReply";
const { TextArea } = Input;
function PostCardDetailComment() {
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
        postId: projectParams.postID,
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
      postId: projectParams.postID,
      content: commentContent,
    };
    dispatch(getCommentsAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setComments(res.payload.Comments);
        setAllComments(res.payload.comments);
      }
    });
    user?.history?.forEach((item: any) => {
      if (item.backingdata.id === projectParams.postID) {
        setIsBacker(true);
      }
      // else {
      //   setIsBacker(false);
      // }
    });
  }, [commentContent, projectParams, user, dispatch]);

  return (
    <div
      style={{
        maxWidth: "1200px",
        width: "100%",
        marginTop: "50px",
        textAlign: "start",
      }}
    >
      <Row>
        <Col span={16}>
          {isBacker ? (
            <Comment
              avatar={
                user?.image?.length === 0
                  ? "https://joeschmoe.io/api/v1/random"
                  : `http://localhost:5000/${user?.image?.[0]?.filePath}`
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
                minHeight: "60px",
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
                <CommentMainForm item={item} isBacker={isBacker} />
                <CommentMainReply item={item} isBacker={isBacker} />
              </li>
            )}
          />
        </Col>
        <Col span={8}>
          <div
            style={{
              marginLeft: "42px",
              padding: "0 20px",
              borderLeft: "0.3rem solid #DCDEDD",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                padding: "10px",
                fontFamily: "inherit",
              }}
            >
              <p>
                This is your space to offer support and feedback. Remember to{" "}
                <a href="/" target="_blank">
                  be constructive
                </a>
                —there's a human behind this project.
              </p>
              <p>Have a question for the creator? Check this project's FAQ</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PostCardDetailComment;
