import { Col, Progress, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { getPaymentAsync } from "../../../Slices/paymentSlice";
import { Project } from "../../types";
import styles from "./Explore.module.css";

interface CardProps {
  item: Project;
}
function CardForm({ item }: CardProps) {
  const dispatch = useAppDispatch();
  const [TotalMoney, setTotalMoney] = useState(0);

  useEffect(() => {
    let body = {
      postId: item?._id,
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
  }, [dispatch, item]);

  return (
    <Row
      style={{ textAlign: "start" }}
      gutter={20}
      className={styles.container}
    >
      <Col
        span={8}
        md={24}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to={`/post/${item?._id}/description`}>
          <img
            alt="main"
            src={`http://localhost:5000/${item?.images?.[0]?.filePath}`}
            width={"100%"}
          />
          <Progress
            strokeColor={"#028858"}
            showInfo={false}
            percent={Math.round((TotalMoney / item?.funding) * 100)}
            strokeLinecap="square"
            style={{ top: "-10px" }}
          />
        </Link>
      </Col>
      <Col span={16} md={24}>
        <Link to={`/post/${item?._id}/description`}>
          <div className={styles.title}>
            <h2>{item?.title?.title}</h2>
            <p style={{ color: "black" }}>{item?.title?.subtitle}</p>
          </div>
        </Link>
        <p style={{ color: "gray" }}>
          By{" "}
          <Link to={`/profile/${item?.writer?._id}`}>
            {item?.writer?.name || item?.writer?.email}
          </Link>
        </p>
      </Col>
    </Row>
  );
}

export default CardForm;
