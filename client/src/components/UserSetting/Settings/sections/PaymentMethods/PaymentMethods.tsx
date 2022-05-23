import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { addPaymentMethodsAsync } from "../../../../../Slices/userSlice";

function PaymentMethods(this: any) {
  const dispatch = useAppDispatch();
  const [CardNumber, setCardNumber] = useState("");
  const [CardholderName, setCardholderName] = useState("");
  const [Expiration, setExpiration] = useState("");
  const [CVC, setCVC] = useState("");
  const [ZipCode, setZipCode] = useState("");

  const onNumberChange = useCallback((e) => {
    setCardNumber(e.target.value);
  }, []);
  const onCardholderNameChange = useCallback((e) => {
    setCardholderName(e.target.value);
  }, []);
  const onExpirationChange = useCallback((e) => {
    if (
      !Number(e.target.value.slice(0, 2)) &&
      e.target.value !== "" &&
      !Number(e.target.value.slice(3, 5))
    )
      return;

    if (e.target.value.length <= 2) {
      setExpiration(e.target.value);
    } else if (e.target.value.length >= 4) {
      setExpiration(
        `${e.target.value.slice(0, 2)}/${e.target.value.slice(3, 5)}`
      );
    } else {
      setExpiration((prev) => {
        if (prev.length === 4) {
          return prev.slice(0, 2);
        } else if (prev.length === 2) {
          return `${e.target.value.slice(0, 2)}/${e.target.value.slice(2, 3)}`;
        } else {
          return prev;
        }
      });
    }
  }, []);
  const onCVCChange = useCallback((e) => {
    setCVC(e.target.value.slice(0, 4));
  }, []);
  const onZipCodeChange = useCallback((e) => {
    setZipCode(e.target.value);
  }, []);
  console.log(Expiration);
  const onFinish = useCallback(() => {
    let body = {
      cardNumber: CardNumber,
      cardholderName: CardholderName,
      expiration: Expiration,
      cvc: CVC,
      zipCode: ZipCode,
    };
    dispatch(addPaymentMethodsAsync(body)).then((res: any) => {
      message.success("저장되었습니다.");
      window.location.reload();
    });
  }, [dispatch, CardNumber, CardholderName, Expiration, CVC, ZipCode]);

  return (
    <div style={{ padding: "20px", textAlign: "start" }}>
      <div style={{ margin: "40px 0" }}>
        <h2>Payment options</h2>
        <p style={{ width: "70%" }}>
          Any payment methods you save to Kickstarter will be listed here
          (securely) for your convenience. To save a card for future pledges,
          just enter your card information and click "Save."
        </p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Card number"
          name="CardNumber"
          rules={[
            { required: true, message: "Please input your Card number!" },
            { min: 3, message: "more than 3" },
          ]}
        >
          <Input
            placeholder="Card number"
            size={"large"}
            type="number"
            value={CardNumber}
            onChange={onNumberChange}
          />
        </Form.Item>
        <Form.Item
          label="Cardholder name"
          name="CardholderName"
          rules={[
            { required: true, message: "Please input your Cardholder name!" },
          ]}
        >
          <Input
            placeholder="Cardholder name"
            size={"large"}
            value={CardholderName}
            onChange={onCardholderNameChange}
          />
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <label>Expiration</label>
            <Input
              placeholder="MM/YY"
              size={"large"}
              type="text"
              value={Expiration}
              onChange={onExpirationChange}
            />
          </Col>
          <Col span={12}>
            <label>Security code</label>
            <Input
              placeholder="CVC"
              size={"large"}
              type="number"
              value={CVC}
              onChange={onCVCChange}
            />
          </Col>
        </Row>
        <Form.Item
          style={{ marginTop: "10px" }}
          label="Zip/Postal code"
          name="Zip/PostalCode"
          rules={[
            { required: true, message: "Please input your Zip/Postal code!" },
          ]}
        >
          <Input
            placeholder="Zip/Postal code"
            size={"large"}
            type="number"
            value={ZipCode}
            onChange={onZipCodeChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", height: "45px", background: "#037362" }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PaymentMethods;
