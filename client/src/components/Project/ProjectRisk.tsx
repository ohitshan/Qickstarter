import { Row, Col, Input } from "antd";
import styles from "./Project.module.css";
import { useCallback, useEffect, useState } from "react";
const { TextArea } = Input;

interface RiskProps {
  getRiskValue(risk: string): void;
}

function ProjectRisk(props: RiskProps) {
  const [Risk, setRisk] = useState("");

  const onRisk = useCallback((e) => {
    setRisk(e.target.value);
  }, []);

  const sendRiskValue = useCallback(() => {
    props.getRiskValue(Risk);
  }, [Risk, props]);

  useEffect(() => {
    sendRiskValue();
  }, [sendRiskValue]);

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col xs={24} md={8} offset={1}>
          <h2>Risks and challenges</h2>
          <p>
            Be honest about the potential risks and challenges of this project
            and how you plan to overcome them to complete it.
          </p>
        </Col>
        <Col xs={24} md={14} offset={1}>
          <TextArea
            rows={4}
            placeholder="Common risks and challenges you may want to address include budgeting,timelines for rewards and the project itself,the size of your audience..."
            onChange={onRisk}
            value={Risk}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ProjectRisk;
