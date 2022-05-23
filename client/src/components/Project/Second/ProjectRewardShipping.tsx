import { Button, Col, Row, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import RewardShippingList from "./section/RewardShippingList";

const { Option } = Select;

export interface CountryList {
  country: string;
  cost: number;
}

interface shippingProps {
  getShippingValue(countries: CountryList[]): void;
}

function ProjectRewardShipping(props: shippingProps) {
  const [selected, setSelected] = useState(0);
  const [list, setList] = useState<CountryList[]>([]);

  const onChange = useCallback((value: number) => {
    setSelected(value);
  }, []);

  const onAddClick = useCallback(() => {
    setList([...list, { country: "", cost: 0 }]);
  }, [list]);

  const onDelete = (index: number) => {
    list.splice(index, 1);
    setList([...list]);
  };

  const getShippingData = useCallback((Country, i) => {
    setList((prev) => {
      prev[i] = Country;
      const newValue = [...prev];
      return newValue;
    });
  }, []);

  useEffect(() => {
    props.getShippingValue(list);
  }, [list, props]);
  return (
    <div>
      <div style={{ textAlign: "start", margin: "30px 0 " }}>
        <h4>Shipping</h4>
        <Select
          placeholder="Select an option"
          onChange={onChange}
          style={{ width: "100%" }}
        >
          <Option value="Select an option" disabled>
            Select an option
          </Option>
          <Option value={1}>No shipping (e.g.,digital reward)</Option>
          <Option value={2}>Only certain countries</Option>
          <Option value={3}>Anywhere in the world</Option>
        </Select>
        {selected === 2 || selected === 3 ? (
          <div>
            {list.length !== 0 &&
              list.map((item, index) => (
                <Row key={index}>
                  <Col span={20}>
                    <RewardShippingList
                      list={list}
                      item={item}
                      getShippingData={getShippingData}
                      i={index}
                    />
                  </Col>

                  <Col span={4}>
                    <Button
                      style={{
                        border: "none",
                        background: "none ",
                        fontSize: "10px",
                      }}
                      onClick={() => {
                        onDelete(index);
                      }}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
            <Button
              style={{
                width: "100%",
                height: "40px",
                margin: "10px 0",
                background: "#028858 ",
              }}
              onClick={onAddClick}
            >
              + Add another destination
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ProjectRewardShipping;
