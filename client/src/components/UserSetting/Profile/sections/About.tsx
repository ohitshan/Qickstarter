import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { useOutletContext } from "react-router-dom";
import { Writer } from "../../../types";

function About() {
  const user = useAppSelector((state: any) => state.user);
  const outlet: Writer = useOutletContext();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!outlet?.privacy && (
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "start",
          }}
        >
          <Row
            style={{ padding: "30px 0", borderBottom: "1px solid #D9D9D9 " }}
          >
            <Col
              span={6}
              style={{ color: "gray", fontWeight: "700", paddingLeft: "15px" }}
            >
              Biography
            </Col>
            <Col span={18}>
              {outlet?.biography ? (
                <div>
                  {outlet?.biography?.split("\n")?.map((line: any) => (
                    <span>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              ) : (
                <div>
                  {outlet?._id === user?.authUser?._id ? (
                    <div>
                      <p>Let people know more about you.</p>
                      <Link to={`/Settings/EditProfile`}>Add a Biography</Link>
                    </div>
                  ) : null}
                </div>
              )}
            </Col>
          </Row>
          <Row style={{ padding: "30px 0" }}>
            <Col
              span={6}
              style={{ color: "gray", fontWeight: "700", paddingLeft: "15px" }}
            >
              Websites
            </Col>
            <Col span={18}>
              {outlet?.websitesList?.length !== 0 ? (
                outlet?.websitesList?.map((item: string) => <div>{item}</div>)
              ) : (
                <div>
                  {outlet?._id === user?.authUser?._id ? (
                    <Link to={`/Settings/EditProfile`}>Add websites</Link>
                  ) : null}
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default About;
