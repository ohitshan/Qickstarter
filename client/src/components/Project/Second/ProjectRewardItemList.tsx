import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import RewardItemList from "./section/RewardItemList";

export interface ItemListObj {
  id: number;
  item: string;
  quantity: number;
}
interface ItemProp {
  getItemsValue(items: ItemListObj[]): void;
}

function ProjectRewardItemList(props: ItemProp) {
  const [itemCliked, setItemClicked] = useState(false);
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState<ItemListObj[]>([]);

  const clickitem = useCallback(() => {
    setItemClicked(!itemCliked);
    setItem("");
  }, [itemCliked]);

  const addItem = useCallback(() => {
    setItemList([...itemList, { item: item, id: Date.now(), quantity: 1 }]);
    setItemClicked(!itemCliked);
    setItem("");
  }, [item, itemList, itemCliked]);

  const onChangeItem = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  }, []);

  const getQuantityValue = useCallback(
    (itemInfo, i) => {
      setItemList((prev) => {
        prev[i] = itemInfo;
        const newValue = [...prev];
        return newValue;
      });
    },
    [itemList]
  );
  const onRemove = (index: number) => {
    itemList.splice(index, 1);
    setItemList([...itemList]);
  };

  const sendItemList = useCallback(() => {
    props.getItemsValue(itemList);
  }, [itemList, props]);

  useEffect(() => {
    sendItemList();
  }, [sendItemList]);

  return (
    <div>
      <div style={{ textAlign: "start", marginBottom: "30px" }}>
        <h4>Items</h4>
        <span>Build out a list of what you're offering.</span>
      </div>
      {itemList.length !== 0 && (
        <Row style={{ textAlign: "start" }}>
          <Col span={18}>
            <Row gutter={20}>
              <Col span={16}>Title</Col>
              <Col span={8}>QUANTITY</Col>
            </Row>
          </Col>
          <Col span={6}></Col>
        </Row>
      )}
      {itemList.map((item, index) => (
        <Row key={index}>
          <Col span={18}>
            <RewardItemList
              item={item}
              getQuantityValue={getQuantityValue}
              i={index}
            />
          </Col>
          <Col span={6}>
            <Button
              style={{ marginTop: "5px" }}
              onClick={() => {
                onRemove(index);
              }}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      {itemCliked ? (
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <Form.Item label="Create a new item">
            <Input onChange={onChangeItem} value={item} />
            <Button onClick={addItem}>Save</Button>
            <Button onClick={clickitem}>Cancel</Button>
          </Form.Item>
        </div>
      ) : itemList.length !== 0 ? (
        <div>
          <Button
            onClick={clickitem}
            style={{
              width: "100%",
              height: "40px",
              margin: "10px 0",
              background: "#028858 ",
            }}
          >
            +New item
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={clickitem}
            style={{
              width: "100%",
              height: "40px",
              margin: "10px 0",
              background: "#028858 ",
            }}
          >
            +New item
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProjectRewardItemList;
