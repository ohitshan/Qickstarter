import React, { useCallback, useState } from "react";
import { Button, Form, Input, Collapse, Radio, Row, Col } from "antd";
import { AimOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

function ProjectRewardLimit() {
  const [selected, setSelected] = useState(0);
  const [Total, setTotal] = useState(100);

  const onRadioChange = useCallback((e) => {
    setSelected(e.target.value);
  }, []);

  const onTotalChange = useCallback((e) => {
    setTotal(e.target.value);
  }, []);

  return (
    <div>
      <div style={{ textAlign: "start", marginBottom: "30px" }}>
        <h4>Project quantity</h4>
        <span>
          Limit the amount available to all backers if mass production or
          shipping is impractical.
        </span>
      </div>
      <Radio.Group onChange={onRadioChange} value={selected}>
        <div>
          <Collapse>
            <Panel
              key="1"
              header={<Radio value={1}>Unlimited</Radio>}
              showArrow={false}
              collapsible="disabled"
            ></Panel>
          </Collapse>
        </div>
        <div style={{ margin: "10px 0" }}>
          <Collapse activeKey={[selected]}>
            <Panel
              key="2"
              header={
                <Radio value={2} style={{ width: "100%" }}>
                  Limited
                </Radio>
              }
              showArrow={false}
            >
              <div style={{ textAlign: "start" }}>
                Which of the following best applies?
              </div>
              <Form layout={"vertical"}>
                <Form.Item
                  name="Total available"
                  label="Total available"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a quantity of one or greater.",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    defaultValue={100}
                    onChange={onTotalChange}
                  />
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
        </div>
      </Radio.Group>
    </div>
  );
}

export default ProjectRewardLimit;
