import React, { useCallback, useEffect, useRef, useState } from "react";
import { Anchor, Badge, Button, Card, Col, Row, Statistic } from "antd";
import styles from "./PostDetail.module.css";
import {
  TagOutlined,
  AliyunOutlined,
  MailOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UploadPost } from "../../Slices/postSlice";
import { getPaymentAsync } from "../../Slices/paymentSlice";
import { onRemindMeAsync } from "../../Slices/userSlice";
import { remindAsync } from "../../Slices/remindSlice";

const { Link } = Anchor;

function PostDetailInfo() {
  const dispatch = useAppDispatch();
  const post = useAppSelector(
    (state: { user: any; post: { getpost?: UploadPost[] } }) =>
      state.post?.getpost
  );
  const payment = useAppSelector(
    (state: any) => state.payment?.payload?.payments
  );
  const user = useAppSelector((state: any) => state.user);
  const [paymentList, setPaymentList] = useState([]);
  const [TotalMoney, setTotalMoney] = useState(0);
  const [ClickedRemind, setClickedRemind] = useState(false);
  const today = new Date(`${post?.[0]?.launch}`);
  const finishDate = new Date(today);
  finishDate.setDate(today.getDate() + Number(post?.[0]?.duration));
  const DateNow = new Date();
  const diff = finishDate.getTime() - DateNow.getTime();
  const diffDays = diff / (24 * 60 * 60 * 1000);

  useEffect(() => {
    let body = {
      postId: post?.[0]?._id,
    };
    console.log(
      user?.authUser?.favorites?.find(
        (element: { id: string }) => element.id === body.postId
      )
    );
    if (
      user?.authUser?.favorites?.find(
        (element: { id: string }) => element.id === body.postId
      )
    ) {
      setClickedRemind(true);
    } else {
      setClickedRemind(false);
    }
    dispatch(getPaymentAsync(body)).then((res: any) => {
      if (res.payload.success) {
        let total = 0;
        setPaymentList(res.payload.payments);
        res.payload.payments?.forEach(
          (payment: any) =>
            (total = total + payment.rewards?.backingdata?.total)
        );
        setTotalMoney(total);
      }
    });
    let updateMoney = setInterval(() => {
      dispatch(getPaymentAsync(body)).then((res: any) => {
        if (res.payload.success) {
          let total = 0;
          setPaymentList(res.payload.payments);
          res.payload.payments?.forEach(
            (payment: any) =>
              (total = total + payment.rewards?.backingdata?.total)
          );
          setTotalMoney(total);
        }
      });
    }, 10000);
    return () => {
      clearInterval(updateMoney);
    };
  }, [dispatch, post, user]);
  // useEffect(() => {
  //   let total = 0;

  //   payment?.forEach(
  //     (payment: any) => (total = total + payment.rewards?.backingdata?.total)
  //   );
  //   setTotalMoney(total);
  // }, [payment]);
  const onRemindClick = useCallback(() => {
    let body = {
      userId: user?.authUser?._id,
      postId: post?.[0]?._id,
    };
    dispatch(onRemindMeAsync(body));
    dispatch(remindAsync(body));
  }, [dispatch, post, user]);

  return (
    <div className={styles.wrapper}>
      <Card
        bordered={false}
        style={{ width: "100%" }}
        bodyStyle={{ padding: 0 }}
      >
        <Statistic
          // title="Total Backing"
          value={`US$ ${TotalMoney.toString().replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}`}
          valueStyle={{ color: "#028858", fontWeight: "600", fontSize: "32px" }}
        />
        <h4>pledged of US$ {post?.[0]?.funding} goal</h4>
        <h1>{paymentList?.length || 0}</h1>
        <h4>backers</h4>
        <h1>{Math.round(diffDays) || 0}</h1>
        <h4>days to go</h4>
      </Card>
      <Anchor affix={false} className="anchor">
        <Button
          style={{
            width: "100%",
            height: "45px",
            background: "#028858",
            color: "white",
            margin: "10px 0",
          }}
        >
          <Link href="#anchor" title="Back this project" />
        </Button>
      </Anchor>
      <Row style={{ margin: "10px 0" }}>
        <Col span={12}>
          <Button
            style={
              ClickedRemind
                ? {
                    width: "100%",
                    height: "45px",
                    background: "#464646 ",
                    color: "white",
                  }
                : {
                    background: "white ",
                    color: "black",
                    width: "100%",
                    height: "45px",
                  }
            }
            onClick={onRemindClick}
          >
            <TagOutlined />
            {ClickedRemind ? "saved" : "Remind me"}
          </Button>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          <FacebookOutlined />

          <TwitterOutlined />
          <MailOutlined />
          <AliyunOutlined />
        </Col>
      </Row>
      <div>
        All or nothing. This project will only be funded if it reaches its goal
        by {finishDate.toLocaleString()}
      </div>
    </div>
  );
}

export default PostDetailInfo;
