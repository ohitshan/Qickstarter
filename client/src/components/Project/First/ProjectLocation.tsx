import { Form, Row, Col } from "antd";
import styles from "../Project.module.css";
import AutoComplete from "react-google-autocomplete";
import { useCallback, useEffect, useState } from "react";

interface locationProps {
  getLocationValue(location: string): void;
}

function ProjectLocation(props: locationProps) {
  const [location, setLocation] = useState<string>("");

  const sendLocationValue = useCallback(() => {
    props.getLocationValue(location);
  }, [location, props]);

  useEffect(() => {
    sendLocationValue();
  }, [location, sendLocationValue]);
  // console.log(process.env.REACT_APP_Google_API_KEY);
  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col xs={24} md={8} offset={1}>
          <h2>Project location</h2>
          <p>
            Enter the location that best describes where your project is based.
          </p>
        </Col>
        <Col xs={24} md={14} offset={1}>
          <Form>
            <AutoComplete
              apiKey={process.env.REACT_APP_Google_API_KEY}
              onPlaceSelected={(place) => setLocation(place.formatted_address)}
              style={{
                width: "100%",
                height: "40px",
                paddingLeft: 16,
                marginTop: 2,
                marginBottom: "2rem",
              }}
              onChange={(e: any) => setLocation(e.target.value)}
            />
            <div style={{ color: "gray" }}>
              ※구글지도 사용을 위해서 Api Key 갱신필요(유료화)※
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectLocation;
