import { Button, Col, Input, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPostByIdAsync } from "../../Slices/postSlice";
import { Project, Reward } from "../types";
import styles from "./ProjectFunding.module.css";
import { DeleteTwoTone, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ProjectFundingButton from "./section/ProjectFundingButton";
import ProjectFundingRewardContent from "./section/ProjectFundingRewardContent";
import { leavePage } from "../../Slices/orderSlice";
import { pledgeSummeryAsync } from "../../Slices/userSlice";

function ProjectFunding() {
  const projectID = useParams();
  const dispatch = useAppDispatch();
  const addedReward = useAppSelector((state) => state.order);
  const orderAmount = useAppSelector((state) => state.order);
  const [Project, setProject] = useState<Project[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | undefined>();
  const [restReward, setRestReward] = useState<Reward[]>([]);
  const [rewardList, setRewardList] = useState<Reward[]>([]);
  const [FixedBar, setFixedBar] = useState(false);
  const [Total, setTotal] = useState(0);
  const [Bonus, setBonus] = useState(
    Number(projectID.backing) - Number(projectID.rewardAmount)
  );

  console.log(addedReward);
  useEffect(() => {
    dispatch(getPostByIdAsync(projectID.projectID)).then((res: any) => {
      setProject(res.payload);
      setRewardList(res.payload[0].reward);
      res.payload[0].reward.forEach((reward: Reward) => {
        if (reward.title === projectID.rewardTitle) {
          setSelectedReward(reward);
        } else {
          setRestReward([...restReward, reward]);
        }
      });
    });
  }, [dispatch, projectID]);

  const onBonusChange = useCallback((e) => {
    setBonus(e.target.value);
  }, []);

  const onContinueClick = useCallback(
    (e) => {
      let body = {
        projectId: Project[0]._id,
        main: selectedReward,
        add: addedReward,
        bonus: Bonus,
        total: Number(projectID.backing) + Total,
      };
      dispatch(pledgeSummeryAsync(body));
    },
    [Project, selectedReward, addedReward, dispatch, projectID, Total]
  );

  const totalHandler = useCallback(() => {
    let TotalPrice = 0;
    orderAmount.forEach((item) => {
      TotalPrice = TotalPrice + item.number * item.price;
    });
    setTotal(TotalPrice);
  }, [orderAmount]);
  useEffect(() => {
    totalHandler();
  }, [totalHandler]);
  useEffect(() => {
    return () => {
      dispatch(leavePage([]));
    };
  }, [dispatch]);

  window.addEventListener("scroll", function () {
    if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
      setFixedBar(true);
    } else {
      setFixedBar(false);
    }
  });
  return (
    <div className={styles.container}>
      <div
        style={{
          background: "#E7EAD9",
          height: "150px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>{Project[0]?.title?.title}</h1>
        <div>{Project[0]?.writer?.email}</div>
      </div>
      <Row className={styles.configure} gutter={40}>
        <Col span={24} lg={16}>
          <h1>Configure reward</h1>
          <div style={{ border: "1px solid #c9c9c9" }}>
            <div style={{ padding: "20px" }}>
              <h4>REWARD</h4>
              <div style={{ padding: "20px" }}>
                <h2>{selectedReward?.title}</h2>
                <div>${selectedReward?.amount}</div>
                <br />
                <div>{selectedReward?.description}</div>
              </div>
            </div>
            {rewardList.map((reward, i) => (
              <ProjectFundingButton key={i} reward={reward} i={i} />
            ))}
            <div
              style={{
                display: "flex",
                margin: "0 10px",
                borderTop: "1px solid #c9c9c9",
                padding: "20px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <h4>BONUS SUPPORT </h4>
                <span style={{ marginLeft: "10px" }}>(optional)</span>
              </div>
              <Input
                addonBefore="$"
                style={{ width: "30%", height: "45px" }}
                defaultValue={
                  Number(projectID.backing) - Number(projectID.rewardAmount)
                }
                onChange={onBonusChange}
                value={Bonus}
                type="number"
                min={0}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "+") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
        </Col>
        <Col span={24} lg={8}>
          <ProjectFundingRewardContent />
        </Col>
      </Row>
      <br />
      <br />

      <div className={FixedBar ? styles.totalBarfixed : styles.totalBar}>
        <Row className={styles.total} gutter={25}>
          <Col span={24} md={16} sm={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Total amount</h2>
              <h2> ${Number(projectID.backing) + Total}</h2>
            </div>
          </Col>
          <Col span={24} md={8} sm={12}>
            <Button
              style={{
                background: "#028858",
                color: "white",
                width: "100%",
                height: "45px",
              }}
              onClick={onContinueClick}
            >
              <Link to={`/project/${projectID.projectID}/payments`}>
                Continue
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProjectFunding;
