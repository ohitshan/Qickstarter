import { Row, Col, Card, DatePicker } from "antd";
import styles from "../Project.module.css";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";

interface TargetProps {
  getTargetValue(date: any): void;
}

function ProjectTarget(props: TargetProps) {
  const [date, setDate] = useState(moment(new Date()));
  const onChange = (date: any, dateString: string) => {
    setDate(date._d);
  };
  const sendTargetValue = useCallback(() => {
    props.getTargetValue(date);
  }, [date, props]);

  useEffect(() => {
    sendTargetValue();
  }, [sendTargetValue]);

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col xs={24} md={8} offset={1}>
          <h2>Target launch date (optional)</h2>
          <p>
            We’ll provide you with recommendations on when to complete steps
            that may take a few days to process. You can edit this date up until
            the moment you launch your project, which must always be done
            manually.
          </p>
        </Col>
        <Col xs={24} md={14} offset={1}>
          <Card>
            <DatePicker
              disabledDate={(current) =>
                current && current < moment().endOf("day")
              }
              defaultValue={date}
              onChange={onChange}
            />
          </Card>
          <Card>
            <h3>We'll recommend when you should:</h3>
            <li style={{ listStyle: "inside" }}>
              Confirm your identity and provide payment details
            </li>
            <li style={{ listStyle: "inside" }}>
              Submit your project for review
            </li>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectTarget;
