import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getReplyCommentsAsync } from "../../../../Slices/commentSlice";

function CommentReply({ item, isBacker }: any) {
  const comment = useAppSelector((state: any) => state.comment.newComment);
  const dispatch = useAppDispatch();
  const [CommentLists, setCommentLists] = useState([]);
  const [seemore, setSeemore] = useState(false);

  useEffect(() => {
    console.log("again");
    let body = {
      updateId: item?.updateId,
      responseTo: item?._id,
    };
    dispatch(getReplyCommentsAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setCommentLists(res.payload.comments);
      }
    });
  }, [dispatch, item, comment]);

  const onClick = () => {
    setSeemore(!seemore);
  };

  return (
    <div style={{ marginLeft: "50px" }}>
      {CommentLists.length > 0 && (
        <div>
          <span style={{ cursor: "pointer", color: "gray" }} onClick={onClick}>
            see more comment({CommentLists.length})
          </span>
        </div>
      )}
      {seemore &&
        CommentLists.map((comment, i) => (
          <div key={i}>
            <CommentForm item={comment} isBacker={isBacker} />
            <CommentReply item={comment} isBacker={isBacker} />
          </div>
        ))}
    </div>
  );
}

export default CommentReply;
