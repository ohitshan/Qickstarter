import { Button, Comment, Form, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { commentAsync } from "../../../../Slices/commentSlice";

function CommentMainForm({ item, isBacker }: any) {
  const projectParams = useParams();
  const user = useAppSelector((state: any) => state?.user?.authUser);
  const dispatch = useAppDispatch();
  const [Content, setContent] = useState("");
  const [replyClick, setReplyClick] = useState(false);

  const onReplyClick = useCallback(() => {
    setReplyClick(!replyClick);
  }, [replyClick]);

  const onContent = useCallback((e) => setContent(e.currentTarget.value), []);

  const onSubmit = useCallback(
    (e) => {
      let body = {
        userId: user._id,
        postId: projectParams.postID,
        responseTo: item._id,
        content: Content,
      };
      dispatch(commentAsync(body)).then((res: any) => {
        if (res.payload.success) {
          setContent("");
          setReplyClick(false);
        }
      });
    },
    [dispatch, user, projectParams, Content, item]
  );

  return (
    <div>
      <Comment
        actions={[
          <span key="comment-list-reply-to-0" onClick={onReplyClick}>
            Reply to
          </span>,
        ]}
        author={
          <Link to={`/profile/${item?.userId?._id}`}>
            {item?.userId?.email}
          </Link>
        }
        avatar={
          item?.userId?.image?.length === 0
            ? "https://joeschmoe.io/api/v1/random"
            : `http://localhost:5000/${item?.userId?.image?.[0]?.filePath}`
        }
        content={item?.content}
        datetime={
          <Tooltip
            title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
          >
            <div>{moment(`${item?.createdAt}`).fromNow()}</div>
          </Tooltip>
        }
        style={{ padding: "20px", margin: "20px", background: "white" }}
      />
      {replyClick && isBacker && (
        <Form onFinish={onSubmit}>
          <Form.Item>
            <TextArea rows={4} onChange={onContent} value={Content} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default CommentMainForm;
