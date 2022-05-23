import { Form, Input, Row, Col } from "antd";
import { useCallback, useEffect, useState } from "react";
import styles from "../Project.module.css";

export interface Title {
  title: string;
  subtitle: string;
}

interface TitleProps {
  getTitleValue(title: Title): void;
}

function ProjectTitle(props: TitleProps) {
  const [Title, setTitle] = useState<Title>({
    title: "",
    subtitle: "",
  });
  const { title, subtitle } = Title;

  const sendTitleValue = useCallback(() => {
    props.getTitleValue(Title);
  }, [Title, props]);

  useEffect(() => {
    sendTitleValue();
  }, [Title, sendTitleValue]);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setTitle((prev) => {
      (prev as any)[name] = value;
      const newValue = { ...prev };
      return newValue;
    });

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col xs={24} md={8} offset={1}>
          <h2>Project title</h2>
          <p>
            Write a clear, brief title and subtitle to help people quickly
            understand your project. Both will appear on your project and
            pre-launch pages.
          </p>
          <p>
            Potential backers will also see them if your project appears on
            category pages, search results, or in emails we send to our
            community.
          </p>
        </Col>
        <Col xs={24} md={14} offset={1}>
          <Form layout="vertical">
            <Form.Item
              label="Title"
              name="Title"
              rules={[
                {
                  required: true,
                  message: "Radiotopia:A Storytelling Revolution",
                },
              ]}
            >
              <Input onChange={handleChange} value={title} name="title" />
            </Form.Item>
            <Form.Item
              label="Subtitle"
              name="Subtitle"
              rules={[
                {
                  // required: true,
                  message:
                    "We are a collective of amazing storytelling radio shows. Let's remake public radio together",
                },
              ]}
            >
              <Input onChange={handleChange} value={subtitle} name="subtitle" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectTitle;
