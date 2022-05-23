import { Button, Input } from "antd";
import React, { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RewardList, selectedReward } from "../../Slices/rewardSlice";
import styles from "./PostDetail.module.css";

interface FundingProps {
  reward: RewardList;
}

function PostCardDetailFundingForm({ reward }: FundingProps) {
  const dispatch = useAppDispatch();
  const projectID = useParams();
  const [amount, setAmount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const onChange = useCallback((e) => {
    setAmount(Number(e.target.value));
  }, []);
  console.log(amount);
  return (
    <div
      className={clicked ? styles.normalContainer : styles.hoverContainer}
      onClick={() => {
        setClicked(true);
      }}
    >
      <div className={clicked ? styles.normaldiv : styles.hoverdiv}>
        <div className={clicked ? styles.normalContent : styles.contentdiv}>
          Select this reward
        </div>
      </div>

      <div
        style={{
          padding: "40px",
          height: "100%",
        }}
      >
        <span>Pledge ${`${reward.amount}`} or more</span>
        <h3 style={{ fontWeight: 600 }}>{reward.title}</h3>

        {clicked ? (
          <div style={{ textAlign: "start" }}>
            <span style={{ color: "gray" }}>Pledge amount</span>
            <Input
              addonBefore="€"
              value={amount}
              showCount
              maxLength={5}
              onChange={onChange}
              placeholder="please put only number"
            />
            <Link
              to={
                amount < reward.amount
                  ? ``
                  : `/project/${projectID.postID}/funding/${amount}/${reward.title}/${reward.amount}`
              }
            >
              <Button
                style={{
                  width: "100%",
                  marginTop: "20px",
                  height: "50px",
                  background: "green",
                  color: "white",
                }}
                onClick={() => {
                  dispatch(selectedReward(reward));
                }}
              >
                Continue
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PostCardDetailFundingForm;
