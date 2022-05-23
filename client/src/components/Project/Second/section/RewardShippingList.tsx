import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { CountryList } from "../ProjectRewardShipping";
const { Option } = Select;

interface CountryInfoData {
  country: string;
  cost: number;
}
interface ShippingProps {
  list: CountryList[];
  item: CountryList;
  getShippingData(countryInfo: CountryInfoData, index: number): void;
  i: number;
}

function RewardShippingList({ getShippingData, i, item, list }: ShippingProps) {
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [countryInfo, setCountryInfo] = useState({
    country: "-",
    cost: 0,
  });
  const countryData = ["Korea", "Japan", "China", "Spain", "USA", "Canada"];

  const onCountryChange = useCallback((value) => {
    setCountryInfo((prev) => {
      prev.country = value;
      const newValue = { ...prev };
      return newValue;
    });
  }, []);

  const onCostChange = useCallback((e) => {
    setCountryInfo((prev) => {
      prev.cost = Number(e.target.value);
      const newValue = { ...prev };
      return newValue;
    });
  }, []);

  const sendShippingData = useCallback(() => {
    getShippingData(countryInfo, i);
  }, [getShippingData, countryInfo, i]);

  useEffect(() => {
    sendShippingData();
  }, [countryInfo]);
  useEffect(() => {
    const country: any = [];
    list.forEach((item) => {
      country.push(item.country);
    });
    setSelectedCountries(country);
  }, [list]);

  return (
    <Row gutter={5} style={{ marginTop: "20px" }}>
      <Col span={12}>
        <Select
          style={{ width: "100%" }}
          onChange={onCountryChange}
          value={item.country}
        >
          <Option value="Select" disabled>
            Select a destination
          </Option>
          <Option value={"-"} disabled>
            ----------------------
          </Option>
          {countryData.map((country, i) => (
            <Option
              value={country}
              key={i + 1}
              disabled={selectedCountries.includes(country) ? true : false}
            >
              {country}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={12}>
        <Input
          addonBefore="$"
          onChange={onCostChange}
          value={item.cost}
          type="number"
          defaultValue={0}
        />
      </Col>
    </Row>
  );
}

export default RewardShippingList;
