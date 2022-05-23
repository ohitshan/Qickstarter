import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;
function FaqAnswerForm({ question, i }: any) {
  return (
    <Collapse
      accordion
      expandIconPosition="right"
      style={{ margin: "10px 20px" }}
    >
      <Panel header={question.answertitle} key={i}>
        <p>{question.content}</p>
      </Panel>
    </Collapse>
  );
}

export default FaqAnswerForm;
