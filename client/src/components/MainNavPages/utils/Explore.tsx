import { Col, Radio, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { SearchBySubCategoryAsync } from "../../../Slices/postSlice";
import { Project } from "../../types";
import CardForm from "./CardForm";
import "./Explore.css";
interface subCategoryProps {
  subCategory: string[];
  main: string;
}

function Explore({ subCategory, main }: subCategoryProps) {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState(subCategory[0]);
  const [subCategoryCardList, setSubCategoryCardList] = useState([]);
  const [ContentSubCategory, setContentSubCategory] = useState<string[]>([]);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  useEffect(() => {
    let havingContents: string[] = [];
    subCategory.forEach((category) => {
      dispatch(
        SearchBySubCategoryAsync({
          sub: category,
        })
      ).then((res: any) => {
        if (res.payload.posts.length !== 0) {
          havingContents.push(category);
        }
      });
    });
    setContentSubCategory(havingContents);
  }, [dispatch]);

  useEffect(() => {
    let body = {
      sub: selectedCategory,
    };
    dispatch(SearchBySubCategoryAsync(body)).then((res: any) => {
      setSubCategoryCardList(res.payload.posts.slice(0, 3));
    });
  }, [selectedCategory, dispatch]);

  return (
    <div style={{ padding: "50px 0" }}>
      <div style={{ background: "#FFF8F5", padding: "30px" }}>
        <div
          style={{
            borderBottom: "1px solid #FECCB3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Explore {main}</h1>
          <Link to={"/search/"}>Discover more</Link>
        </div>
        <Row style={{ textAlign: "start" }}>
          <Col span={24} md={6} style={{ padding: "20px 0" }}>
            <Radio.Group
              value={selectedCategory}
              onChange={handleCategoryChange}
              buttonStyle={"solid"}
              size={"large"}
            >
              {ContentSubCategory?.map((category) => (
                <div key={category}>
                  <Radio.Button value={category} className="subCategoryButton">
                    {category}
                  </Radio.Button>
                </div>
              ))}
            </Radio.Group>
          </Col>
          <Col span={24} md={18} style={{ padding: "20px 0" }}>
            <Row gutter={[20, 20]}>
              {subCategoryCardList.map((item: Project, i) => (
                <Col
                  span={24}
                  md={8}
                  className={`cardSlide${i}`}
                  key={item._id}
                >
                  <CardForm item={item} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Explore;
