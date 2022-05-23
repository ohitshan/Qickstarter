import { Row, Col, Form, Input, message } from "antd";
import styles from "../Project.module.css";
import { useCallback, useEffect, useState } from "react";

interface FundingProps {
  getFundingValue(amount: number): void;
}

function ProjectFund(props: FundingProps) {
  const [amount, setAmount] = useState(0);
  const sendFundingValues = useCallback(() => {
    props.getFundingValue(amount);
  }, [amount, props]);

  useEffect(() => {
    sendFundingValues();
  }, [sendFundingValues]);

  const onChange = useCallback((e) => {
    if (!Number(e.target.value)) {
      message.warn("please enter the number");
    }
    if (e.target.value > 10000) {
      message.warn("please enter number under 10000");
      return;
    }

    setAmount(Number(e.target.value));
  }, []);

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col sm={24} md={8} offset={1}>
          <h2>Funding goal</h2>
          <p>
            Set an achievable goal that covers what you need to complete your
            project.
          </p>
          <p>
            Funding is all-or-nothing. If you don’t meet your goal, you won’t
            receive any money.
          </p>
        </Col>
        <Col sm={24} md={14} offset={1}>
          <Form layout="vertical">
            <Form.Item
              label="Goal amount"
              name="Goal amount"
              rules={[
                {
                  required: true,
                  message: "Your funding goal must be between €1 - €10000",
                },
              ]}
            >
              <Input
                addonBefore="€"
                value={amount}
                showCount
                maxLength={5}
                onChange={onChange}
                placeholder="please put only number"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectFund;
