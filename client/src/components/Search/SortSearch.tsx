import { Select } from "antd";
import React from "react";
const { Option } = Select;

const List = ["Popularity", "Newest", "End Date", "Most Funded", "Most Backed"];

function SortSearch() {
  return (
    <Select
      style={{ margin: "0 5px" }}
      placeholder="Popularity"
      defaultValue="Popularity"
      size={"large"}
      dropdownMatchSelectWidth={false}
    >
      {List.map((list) => (
        <Option value={list}>{list}</Option>
      ))}
    </Select>
  );
}

export default SortSearch;
