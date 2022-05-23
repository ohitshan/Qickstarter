import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getPaymentAsync } from "../../../Slices/paymentSlice";

function PostCardDetailCommunity() {
  const ProjectParams = useParams();
  const post = useAppSelector((state: any) => state?.post?.getpost?.[0]);
  const dispatch = useAppDispatch();
  const [backingList, setBackingList] = useState([]);
  useEffect(() => {
    let body = {
      postId: ProjectParams.postID,
    };
    dispatch(getPaymentAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setBackingList(res.payload.payments);
      }
    });
  }, [ProjectParams, dispatch]);
  return (
    <div
      style={{
        minHeight: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
      }}
    >
      {backingList.length} people are supporting {post?.title?.title}
    </div>
  );
}

export default PostCardDetailCommunity;
