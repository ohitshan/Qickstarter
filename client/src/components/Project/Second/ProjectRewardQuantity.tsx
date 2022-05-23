import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Collapse, Radio } from "antd";
const { Panel } = Collapse;

interface SelectedQuantity {
  isLimited: string;
  quantity: number;
}

interface QuantityProps {
  getQuantityValue(quantity: SelectedQuantity): void;
}

function ProjectRewardQuantity(props: QuantityProps) {
  const [selected, setSelected] = useState({
    isLimited: "Unlimited",
    quantity: 0,
  });
  const onRadioChange = useCallback((e) => {
    setSelected((prev) => {
      prev.isLimited = e.target.value;
      if (e.target.value === "Limited") {
        prev.quantity = 100;
      } else {
        prev.quantity = 0;
      }
      const newValue = { ...prev };
      return newValue;
    });
  }, []);

  const onTotalChange = useCallback((e) => {
    setSelected((prev) => {
      prev.quantity = Number(e.target.value);
      const newValue = { ...prev };
      return newValue;
    });
  }, []);

  const sendQuantityValue = useCallback(() => {
    props.getQuantityValue(selected);
  }, [props, selected]);

  useEffect(() => {
    sendQuantityValue();
  }, [sendQuantityValue]);

  return (
    <div>
      <div style={{ textAlign: "start", marginBottom: "30px" }}>
        <h4>Project quantity</h4>
        <span>
          Limit the amount available to all backers if mass production or
          shipping is impractical.
        </span>
      </div>
      <Radio.Group
        onChange={onRadioChange}
        value={selected.isLimited}
        style={{ width: "100%" }}
      >
        <Collapse>
          <Panel
            key="Unlimited"
            header={<Radio value={"Unlimited"}>Unlimited</Radio>}
            showArrow={false}
            collapsible="disabled"
          ></Panel>
        </Collapse>
        <Collapse activeKey={[selected.isLimited]} style={{ margin: "10px 0" }}>
          <Panel
            key="Limited"
            header={
              <Radio value={"Limited"} style={{ width: "100%" }}>
                Limited
              </Radio>
            }
            showArrow={false}
          >
            <div style={{ textAlign: "start" }}>
              Which of the following best applies?
            </div>
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
          </Panel>
        </Collapse>
      </Radio.Group>
    </div>
  );
}

export default ProjectRewardQuantity;
