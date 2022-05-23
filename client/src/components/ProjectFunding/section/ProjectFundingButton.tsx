import { DeleteTwoTone, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  rewardPlusOrder,
  rewardMinusOrder,
  removeFromOrder,
} from "../../../Slices/orderSlice";
import styles from "../ProjectFunding.module.css";

interface rewardButtonProps {
  reward: any;
  i: number;
}

function ProjectFundingButton({ reward }: rewardButtonProps) {
  const dispatch = useAppDispatch();
  const [clicked, setClicked] = useState(false);
  const [orderAmount, setOrderAmount] = useState(1);

  const plusHandler = useCallback(() => {
    let body = {
      title: reward.title,
      price: reward.amount,
      number: orderAmount,
    };
    if (orderAmount >= 10) return;
    setOrderAmount((prev) => prev + 1);
    dispatch(rewardPlusOrder(body));
  }, [orderAmount, dispatch, reward]);

  const minusHandler = useCallback(() => {
    let body = {
      title: reward.title,
      price: reward.amount,
      number: orderAmount,
    };
    if (orderAmount <= 1) return;
    setOrderAmount((prev) => prev - 1);
    dispatch(rewardMinusOrder(body));
  }, [orderAmount, dispatch, reward]);

  return (
    <div
      key={reward.title}
      style={{ margin: "0 10px", borderTop: "1px solid #c9c9c9" }}
    >
      <Row
        style={{ textAlign: "start", padding: "10px 0 10px 20px" }}
        gutter={20}
      >
        <Col span={12} xs={24} sm={12} lg={14}>
          {/*축소했을때 휴지통 */}
          <Row>
            <Col xs={22} sm={24}>
              <h3>{reward.title}</h3>
              <div>${reward.amount}</div>
              <div>{reward.description}</div>
            </Col>
            <Col
              xs={2}
              sm={0}
              className={clicked ? styles.clickedTrashbin : styles.trashbin}
            >
              <DeleteTwoTone
                style={clicked ? {} : { cursor: "default" }}
                twoToneColor={clicked ? "black" : "gray"}
                onClick={() => {
                  let body = {
                    title: reward.title,
                    price: reward.amount,
                    number: orderAmount,
                  };
                  dispatch(removeFromOrder(body));
                  setOrderAmount(1);
                  setClicked(false);
                }}
              />
            </Col>
          </Row>
        </Col>

        <Col span={12} xs={24} sm={12} lg={10}>
          <Row gutter={10}>
            <Col xs={24} sm={20}>
              {clicked ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    textAlign: "center",
                    paddingTop: "5px",
                  }}
                >
                  <Button onClick={minusHandler}>
                    <MinusOutlined />
                  </Button>
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid #D9D9D9",
                      fontSize: "20px",
                    }}
                  >
                    {orderAmount}
                  </div>
                  <Button onClick={plusHandler}>
                    <PlusOutlined />
                  </Button>
                </div>
              ) : (
                <Button
                  style={{
                    background: "#028858",
                    width: "100%",
                    height: "45px",
                  }}
                  onClick={() => {
                    let body = {
                      title: reward.title,
                      price: reward.amount,
                      number: orderAmount,
                    };
                    setClicked(true);
                    dispatch(rewardPlusOrder(body));
                  }}
                >
                  Add
                </Button>
              )}
            </Col>
            <Col
              xs={0}
              sm={4}
              className={clicked ? styles.clickedTrashbin : styles.trashbin}
            >
              <DeleteTwoTone
                style={clicked ? {} : { cursor: "default" }}
                twoToneColor={clicked ? "black" : "gray"}
                onClick={() => {
                  let body = {
                    title: reward.title,
                    price: reward.amount,
                    number: orderAmount,
                  };
                  dispatch(removeFromOrder(body));
                  setOrderAmount(1);
                  setClicked(false);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectFundingButton;
