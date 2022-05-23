import { Col, Row } from "antd";
import PaymentCreditCard from "./section/PaymentCreditCard";
import PaymentSummary from "./section/PaymentSummary";

function ProjectPayment() {
  return (
    <Row>
      <Col span={24} md={12}>
        <PaymentSummary />
      </Col>
      <Col span={24} md={12} style={{ background: "#E7EAD9" }}>
        <PaymentCreditCard />
      </Col>
    </Row>
  );
}

export default ProjectPayment;
