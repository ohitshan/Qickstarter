import React, { useCallback, useEffect, useState } from "react";
import { Collapse, Radio, Row, Col, Form, Input } from "antd";
const { Panel } = Collapse;

interface ContentsProps {
  getContentsValue(main: number, yes?: number): void;
}

function ProjectRewardContents(props: ContentsProps) {
  const [selected, setSelected] = useState(0);
  const [yesSelected, setYesSelected] = useState(0);

  const onRadioChange = useCallback((e) => {
    setSelected(e.target.value);
  }, []);

  const onYesRadioChange = useCallback(
    (e) => {
      if (selected === 1) {
        setYesSelected(e.target.value);
      } else {
        setYesSelected(0);
      }
    },
    [selected]
  );

  const sendContentsValue = useCallback(() => {
    props.getContentsValue(selected, yesSelected);
  }, [props, selected, yesSelected]);

  useEffect(() => {
    sendContentsValue();
  }, [sendContentsValue]);

  return (
    <div>
      <div style={{ textAlign: "start", marginBottom: "30px" }}>
        <h4>Contents</h4>
        <span>Will your backers receive any physical goods?</span>
      </div>
      <Radio.Group onChange={onRadioChange} value={selected}>
        <div>
          <Collapse activeKey={[selected]}>
            <Panel
              key="1"
              header={
                <Radio value={1} style={{ width: "100%" }}>
                  Yes
                </Radio>
              }
              showArrow={false}
            >
              <div style={{ textAlign: "start" }}>
                Which of the following best applies?
              </div>
              <Radio.Group onChange={onYesRadioChange} value={yesSelected}>
                <Row>
                  <Col span={24}>
                    <Radio
                      value={1}
                      style={{
                        border: "1px solid #e9e9e9",
                        width: "100%",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        padding: "30px 10px",
                        margin: "20px 0",
                      }}
                    >
                      Only physical goods
                    </Radio>
                  </Col>
                  <Col span={24}>
                    <Radio
                      value={2}
                      style={{
                        border: "1px solid #e9e9e9",
                        width: "100%",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        padding: "30px 10px",
                        margin: "5px 10px 0 0",
                      }}
                    >
                      physical and digital goods/services
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Panel>
          </Collapse>
        </div>
        <div style={{ margin: "10px 0" }}>
          <Collapse>
            <Panel
              key="2"
              header={
                <Radio value={2}>No,only digital goods and/or services</Radio>
              }
              showArrow={false}
              collapsible="disabled"
            ></Panel>
          </Collapse>
        </div>
      </Radio.Group>
    </div>
  );
}

export default ProjectRewardContents;
