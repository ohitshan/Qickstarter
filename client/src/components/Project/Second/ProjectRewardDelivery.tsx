import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Select } from "antd";
const { Option } = Select;
const MonthData = [
  {
    id: 1,
    month: "January",
  },
  { id: 2, month: "February" },
  { id: 3, month: "March" },
  { id: 4, month: "April" },
  { id: 5, month: "May" },
  { id: 6, month: "June" },
  { id: 7, month: "July" },
  { id: 8, month: "August" },
  { id: 9, month: "September" },
  { id: 10, month: "Octobor" },
  { id: 11, month: "November" },
  { id: 12, month: "December" },
];
const YearData = [
  { id: 1, Year: 2022 },
  { id: 2, Year: 2023 },
  { id: 3, Year: 2024 },
];
interface Date {
  month: string | null;
  year: string | null;
}

interface DeliveryProps {
  getDeliveryValue(date: Date): void;
}

function ProjectRewardDelivery(props: DeliveryProps) {
  const [Date, setDate] = useState({
    month: null,
    year: null,
  });
  console.log(Date);
  const onMonthChange = useCallback((value) => {
    setDate((prev) => {
      prev.month = value;
      const newValue = { ...prev };
      return newValue;
    });
  }, []);
  const onYearChange = useCallback((value) => {
    setDate((prev) => {
      prev.year = value;
      const newValue = { ...prev };
      return newValue;
    });
  }, []);

  const sendDeliveryValue = useCallback(() => {
    props.getDeliveryValue(Date);
  }, [Date, props]);

  useEffect(() => {
    sendDeliveryValue();
  }, [sendDeliveryValue]);

  return (
    <div className="App" style={{ margin: "30px 0" }}>
      <h3>Estimated delivery</h3>
      <span>
        Give yourself plenty of time. It's better to deliver to backers ahead of
        schedule than behind.
      </span>
      <Row gutter={20}>
        <Col span={12}>
          <Select
            onChange={onMonthChange}
            style={{ width: "100%", textAlign: "start" }}
            defaultValue="Month"
          >
            <Option value="Month" disabled>
              Month
            </Option>
            {MonthData.map((month) => (
              <Option key={month.id} value={month.month}>
                {month.month}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Select
            onChange={onYearChange}
            style={{ width: "100%", textAlign: "start" }}
            defaultValue="Year"
          >
            <Option value="Year" disabled>
              Year
            </Option>
            {YearData.map((year) => (
              <Option key={year.id} value={year.Year}>
                {year.Year}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectRewardDelivery;
