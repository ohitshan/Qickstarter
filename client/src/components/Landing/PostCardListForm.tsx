import { List } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPaymentAsync } from "../../Slices/paymentSlice";
import { Project } from "../types";
import LikeRemindDiv from "./LikeRemindDiv";
import styles from "./LandingPage.module.css";

interface PostCardListProps {
  item: Project;
}

function PostCardListForm({ item }: PostCardListProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [TotalMoney, setTotalMoney] = useState(0);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let body = {
      postId: item?._id,
      userId: user?.authUser?._id,
    };
    dispatch(getPaymentAsync(body)).then((res: any) => {
      if (res.payload.success) {
        let total = 0;
        res.payload.payments?.forEach(
          (payment: any) =>
            (total = total + payment.rewards?.backingdata?.total)
        );
        setTotalMoney(total);
      }
    });
  }, [dispatch, item, user]);
  return (
    <List.Item
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      key={item._id}
      actions={[]}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <Link
        to={`/post/${item._id}/description`}
        style={{ width: "40%", paddingRight: "20px" }}
      >
        <img
          width={"100%"}
          height={"100%"}
          alt="logo"
          src={`http://localhost:5000/${item?.images?.[0]?.filePath}`}
        />
      </Link>
      <div
        style={{
          width: "auto",
          textAlign: "left",
        }}
      >
        <Link to={`/post/${item._id}/description`}>
          <div
            className={
              isHover ? styles.titleHoverUnderline : styles.titleUnderline
            }
          >
            {item?.title?.title.length > 20 ? (
              <div>{item.title.title.slice(0, 20)}...</div>
            ) : (
              <div>{item.title.title}</div>
            )}
          </div>
        </Link>
        <h5 style={{ color: "#037362" }}>
          {Math.round((TotalMoney / item?.funding) * 100)}% funded
        </h5>
        <div>
          By <Link to={`/profile/${item.writer._id}`}>{item.writer.email}</Link>
        </div>
        <LikeRemindDiv item={item} />
      </div>
    </List.Item>
  );
}

export default PostCardListForm;
