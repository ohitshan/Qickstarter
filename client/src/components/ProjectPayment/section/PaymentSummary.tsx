import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getPostByIdAsync } from "../../../Slices/postSlice";
import { Project } from "../../types";

function PaymentSummary() {
  const dispatch = useAppDispatch();
  const projectID = useParams();
  const [Project, setProject] = useState<Project>();
  const [ImagePath, setImagePath] = useState("");
  const Summary = useAppSelector((state: any) => state?.user?.authUser);
  console.log(Summary);
  useEffect(() => {
    dispatch(getPostByIdAsync(projectID.projectID)).then((res: any) => {
      setProject(res?.payload[0]);
      setImagePath(res?.payload[0]?.images[0].filePath);
    });
  }, [projectID, dispatch, Summary]);
  return (
    <div style={{ padding: "50px", textAlign: "start" }}>
      <div style={{ fontSize: "40px", marginBottom: "10px" }}>
        Pledge summary
      </div>
      <p>
        We won’t charge you at this time. If the project reaches its funding
        goal, your payment method will be charged when the campaign ends. You’ll
        receive a confirmation email at tjrrhks18@gmail.com when your pledge is
        successfully processed.
      </p>

      <Row gutter={20} style={{ margin: "20px 0" }}>
        <Col span={10}>
          <Link to={`/post/${projectID.projectID}/description`}>
            <img
              src={`http://localhost:5000/${ImagePath}`}
              alt="main"
              width={"100%"}
              height={"80px"}
            />
          </Link>
        </Col>
        <Col span={14}>
          <h4>
            <Link to={`/post/${projectID.projectID}/description`}>
              {Project?.title.title}
            </Link>
          </h4>
          <h5>
            By{" "}
            <Link to={`/post/${projectID.projectID}/description`}>
              {Project?.writer.email}
            </Link>
          </h5>
        </Col>
      </Row>
      <h2>Your pledge</h2>
      <div style={{ padding: "10px 30px" }}>
        <Row>
          <Col span={4}>
            <div>Reward</div>
          </Col>
          <Col span={20}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{Summary?.summary?.[0]?.main?.title}</div>
              <div>${Summary?.summary?.[0]?.main?.amount}</div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={4}>
            <div>Add-ons</div>
          </Col>
          <Col span={20}>
            {Summary?.summary?.[0]?.add.map((item: any) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "16px" }}>
                  {item.title}
                  <div
                    style={{
                      color: "#D9D9D9",
                      lineHeight: "5px",
                      fontSize: "13px",
                    }}
                  >
                    {item.number}x${item.price} each
                  </div>
                </div>
                <div>${item.price * item.number}</div>
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <div>Bonus</div>
          </Col>
          <Col span={20}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div>${Summary?.summary?.[0]?.bonus}</div>
            </div>
          </Col>
        </Row>
        <hr style={{ border: "0.5px solid #D9D9D9 " }} />
        <Row>
          <Col span={10}>
            <div style={{ fontSize: "16px", fontWeight: "bolder" }}>
              Total amount
            </div>
          </Col>
          <Col span={14}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div>${Summary?.summary?.[0]?.total}</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PaymentSummary;
