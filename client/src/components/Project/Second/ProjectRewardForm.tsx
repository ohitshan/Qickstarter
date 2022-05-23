import { Col, Row } from "antd";
import React, { useCallback, useState } from "react";
import styles from "../Project.module.css";

interface RewardFormProps {
  reward: any;
}

function ProjectRewardForm({ reward }: RewardFormProps) {
  return (
    <div className={styles.container}>
      <div style={{ textAlign: "start" }}>
        <Row>
          <Col span={6}>PLEDGE AMOUNT</Col>
          <Col span={12}>DETAILS</Col>
          <Col span={6}>INCLUDES</Col>
        </Row>
      </div>
      <div
        style={{
          border: "1px solid #e2e2e2",
          width: "100%",
          minHeight: "100px",
          textAlign: "start",
          padding: "10px 5px",
        }}
      >
        <Row>
          <Col span={6}>
            <h3>${reward.amount}</h3>
          </Col>
          <Col span={12}>
            <h3>{reward.description}</h3>
            <h4>
              Estimated delivery : {reward.delivery.month}{" "}
              {reward.delivery.year}
            </h4>
            {reward.shippingcountries.length > 0 ? (
              <div>Ships to: Only certain countries</div>
            ) : (
              <div></div>
            )}
            <div>
              {reward.contentmain === 1
                ? reward.contentyes === 1
                  ? "Only physical goods"
                  : "Physical and digital goods/services"
                : "No, only digital goods and/or services"}
            </div>
            <br />
            <div>
              {reward.quantity.isLimited === "Limited"
                ? `Limited (${reward.quantity.quantity})`
                : "Unlimited"}
            </div>
          </Col>
          <Col span={6}>
            <ul style={{ paddingLeft: "20px" }}>
              {reward.items.map(
                (reward: { id: number; quantity: number; item: string }) => (
                  <li>
                    {reward.quantity}x{reward.item}
                  </li>
                )
              )}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProjectRewardForm;
