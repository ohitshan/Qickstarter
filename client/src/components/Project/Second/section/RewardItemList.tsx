import { Col, Input, Row, Form } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { ItemListObj } from "../ProjectRewardItemList";
import { FormInstance } from "antd/es/form";
interface ItemProps {
  item: ItemListObj;
  getQuantityValue(itemInfo: ItemListObj, index?: number): void;
  i: number;
}

function RewardItemList({ item, i, getQuantityValue }: ItemProps) {
  const [ItemList, setItemList] = useState(item);
  const [index, setindex] = useState(i);

  const sendQuantityValue = useCallback(() => {
    getQuantityValue(ItemList, index);
  }, [getQuantityValue, index, ItemList]);

  const ItemChange = useCallback((e) => {
    setItemList((prev) => {
      prev.quantity = Number(e.target.value);
      const newValue = { ...prev };
      return newValue;
    });
  }, []);

  useEffect(() => {
    sendQuantityValue();
  }, [ItemList]);
  useEffect(() => {
    setItemList(item);
  }, [item]);

  return (
    <div style={{ margin: "5px 0" }}>
      <Row gutter={20}>
        <Col span={16}>
          <Input value={item.item} defaultValue={item.item} disabled />
        </Col>
        <Col span={8}>
          <Input
            onChange={ItemChange}
            value={item.quantity}
            type="number"
            defaultValue={item.quantity}
          />
        </Col>
      </Row>
    </div>
  );
}

export default RewardItemList;
