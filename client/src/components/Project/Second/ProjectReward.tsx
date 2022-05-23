import { Button, Col, Form, Input, Row } from "antd";
import React, { useCallback, useState } from "react";
import ProjectRewardContents from "./ProjectRewardContents";
import ProjectRewardDelivery from "./ProjectRewardDelivery";
import ProjectRewardItemList from "./ProjectRewardItemList";
import ProjectRewardQuantity from "./ProjectRewardQuantity";
import ProjectRewardShipping from "./ProjectRewardShipping";
import styles from "../Project.module.css";
import { useAppDispatch } from "../../../app/hooks";
import { rewardList } from "../../../Slices/rewardSlice";
const { TextArea } = Input;

interface RewardProp {
  newReward: boolean;
  getClick(clicked: boolean): void;
}

function ProjectReward(props: RewardProp) {
  const dispatch = useAppDispatch();
  const [Title, setTitle] = useState("");
  const [Amount, setAmount] = useState(0);
  const [Descrip, setDescrip] = useState("");
  const [Items, setItems] = useState([]);
  const [ContentsMain, setContentsMain] = useState(0);
  const [ContentsYes, setContentsYes] = useState(0);
  const [ShippingCountries, setShippingCountries] = useState([]);
  const [Delivery, setDelivery] = useState([]);
  const [Quantity, setQuantity] = useState([]);
  // console.log(
  //   Title,
  //   Amount,
  //   Descrip,
  //   Items,
  //   ContentsMain,
  //   ContentsYes,
  //   ShippingCountries,
  //   Delivery,
  //   Quantity
  // );
  const onTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onAmountChange = useCallback((e) => {
    setAmount(Number(e.target.value));
  }, []);
  const onDescripChange = useCallback((e) => {
    setDescrip(e.target.value);
  }, []);
  const getItemsValue = useCallback((item) => {
    setItems(item);
  }, []);

  const getContentsValue = useCallback((main, yes) => {
    setContentsMain(main);
    if (main === 1) {
      setContentsYes(yes);
    } else {
      setContentsYes(0);
    }
  }, []);

  const getShippingValue = useCallback((countries) => {
    setShippingCountries(countries);
  }, []);

  const getDeliveryValue = useCallback((date) => {
    setDelivery(date);
  }, []);

  const getQuantityValue = useCallback((quantity) => {
    setQuantity(quantity);
  }, []);

  const sendClick = useCallback(() => {
    props.getClick(!props.newReward);
  }, [props]);

  const onFinish = useCallback(() => {
    alert("12");
    let body = {
      title: Title,
      amount: Amount,
      description: Descrip,
      items: Items,
      contentmain: ContentsMain,
      contentyes: ContentsYes,
      shippingcountries: ShippingCountries,
      delivery: Delivery,
      quantity: Quantity,
    };
    dispatch(rewardList(body));
    sendClick();
    setTitle("");
    setAmount(0);
    setDescrip("");
    setContentsMain(0);
    setContentsYes(0);
  }, [
    Title,
    Amount,
    Descrip,
    ContentsMain,
    ContentsYes,
    dispatch,
    sendClick,
    Delivery,
    Quantity,
    ShippingCountries,
    Items,
  ]);

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "start", marginBottom: "30px" }}>
        <h4>Add a reward</h4>
        <span>
          Offer tangible or intangible things that bring backers closer to your
          project.
        </span>
      </div>
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item label="Title">
          <Input onChange={onTitleChange} value={Title} />
        </Form.Item>

        <hr />
        <Form.Item label="Amount">
          <Input
            addonBefore="€"
            onChange={onAmountChange}
            value={Amount}
            type={"number"}
          />
        </Form.Item>
        <hr />
        <Form.Item label="Description">
          <TextArea onChange={onDescripChange} value={Descrip}></TextArea>
        </Form.Item>
        <hr />
        <ProjectRewardItemList getItemsValue={getItemsValue} />
        <hr />
        <ProjectRewardContents getContentsValue={getContentsValue} />
        <hr />
        <ProjectRewardShipping getShippingValue={getShippingValue} />
        <hr />
        <ProjectRewardDelivery getDeliveryValue={getDeliveryValue} />
        <hr />
        <ProjectRewardQuantity getQuantityValue={getQuantityValue} />
        <hr />
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Button
              style={{
                width: "100%",
                background: "darkgreen",
                minHeight: "50px",
                color: "white",
              }}
              onClick={onFinish}
            >
              Save reward
            </Button>
          </Col>
          <Col span={24}>
            <Button
              style={{ width: "100%", minHeight: "50px" }}
              onClick={sendClick}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProjectReward;
