import {
  Row,
  Col,
  Form,
  Input,
  Collapse,
  Space,
  Radio,
  DatePicker,
  TimePicker,
} from "antd";
import styles from "../Project.module.css";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
const { Panel } = Collapse;

interface DurationProps {
  getDurationValue(duration: any): void;
}

function ProjectDuration(props: DurationProps) {
  const [selected, setSelected] = useState(1);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(moment(new Date()));
  const [time, setTime] = useState("");

  const onSelected = useCallback((e) => {
    setSelected(e.target.value);
  }, []);
  const onDuration = useCallback((e) => {
    setDuration(e.target.value);
  }, []);
  const onDate = (date: any, dateString: string) => {
    setDate(date._d);
  };
  const onTime = (time: any) => {
    setTime(time._d);
  };

  const sendDurationValue = useCallback(() => {
    if (selected === 1) {
      props.getDurationValue(duration);
    } else {
      props.getDurationValue(date + time);
    }
  }, [date, props, duration, selected, time]);

  const onpanel = (key: any) => {
    console.log(key[0]);
    if (key[0] === "2") {
      setSelected(1);
    } else if (key[0] === "1") {
      setSelected(2);
    }
  };

  useEffect(() => {
    sendDurationValue();
  }, [sendDurationValue]);

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col sm={24} md={8} offset={1}>
          <h2>Campaign duration</h2>
          <p>
            Set a time limit for your campaign. You won’t be able to change this
            after you launch.
          </p>
        </Col>
        <Col sm={24} md={14} offset={1}>
          <Radio.Group onChange={onSelected} value={selected}>
            <Row gutter={[20, 20]}>
              <Col span={24} style={{ display: "flex" }}>
                <Radio value={1} className={styles.fixwidth}></Radio>
                <Collapse
                  style={{ width: "100%" }}
                  activeKey={[`${selected}`]}
                  onChange={onpanel}
                >
                  <Panel header="Fixed number of days(1-60)" key="1">
                    <Form layout="vertical">
                      <Form.Item
                        label="Enter number of days"
                        name="days"
                        rules={[
                          {
                            message: "Please enter number of days",
                          },
                        ]}
                      >
                        <Input
                          defaultValue={0}
                          onChange={onDuration}
                          value={duration}
                        />
                      </Form.Item>
                    </Form>
                  </Panel>
                </Collapse>
              </Col>
              <Col span={24} style={{ display: "flex" }}>
                <Radio value={2} className={styles.fixwidth}></Radio>
                <Collapse
                  style={{ width: "100%" }}
                  activeKey={[`${selected}`]}
                  onChange={onpanel}
                >
                  <Panel header="End on a specific data & time" key="2">
                    <Space direction="vertical">
                      <Form layout="vertical">
                        <Form.Item
                          label="Date"
                          name="Date"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <DatePicker
                            defaultValue={date}
                            onChange={onDate}
                            disabledDate={(current) =>
                              current && current < moment().endOf("day")
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          label="Time"
                          name="Time"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <TimePicker onChange={onTime} />
                        </Form.Item>
                      </Form>
                    </Space>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </Radio.Group>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectDuration;
