import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import PostCard from "../Landing/PostCard";
import PostCardMain from "../Landing/PostCardMain";
import { NavBar } from "../NavBar/NavBar";
import Explore from "./utils/Explore";
import styles from "../Landing/LandingPage.module.css";
import { useAppDispatch } from "../../app/hooks";
import { Project } from "../types";
import { SearchByCategoryAsync } from "../../Slices/postSlice";

function FoodCraft() {
  const dispatch = useAppDispatch();
  const [FoodPost, setFoodPost] = useState<Project[]>([]);
  const [FashionPost, setFashionPost] = useState<Project[]>([]);
  const [CraftPost, setCraftPost] = useState<Project[]>([]);
  const FoodsubCategory = [
    "Bacon",
    "Community Gardens",
    "Cookbooks",
    "Drinks",
    "Events",
    "Farmer`s Markets",
    "Farms",
    "Food Trucks",
    "Restaurants",
    "Small Batch",
    "Spaces",
    "Vegan",
  ];
  const FashionsubCategory = [
    "Accessories",
    "Apparel",
    "Childrenswear",
    "Couture",
    "Footwear",
    "Jewelry",
    "Pet Fashion",
    "Ready-To-Wear",
  ];
  const CraftssubCategory = [
    "Candles",
    "Crochet",
    "DIY",
    "Embroidery",
    "Glass",
    "Knitting",
    "Pottery",
    "Printing",
    "Quilts",
    "Stationery",
    "Weaving",
    "Woodworking",
  ];

  useEffect(() => {
    let Foodbody = {
      main: "Food",
    };
    let Fashionbody = {
      main: "Fashion",
    };
    let Craftsbody = {
      main: "Crafts",
    };
    dispatch(SearchByCategoryAsync(Foodbody)).then((res: any) => {
      if (res.payload.success) {
        console.log(res);
        setFoodPost(res.payload.posts);
      }
    });
    dispatch(SearchByCategoryAsync(Fashionbody)).then((res: any) => {
      if (res.payload.success) {
        setFashionPost(res.payload.posts);
      }
    });
    dispatch(SearchByCategoryAsync(Craftsbody)).then((res: any) => {
      if (res.payload.success) {
        setCraftPost(res.payload.posts);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Food & Craft</h1>
            <p style={{ fontSize: "18px" }}>
              See how artisans and entrepreneurs are using Kickstarter to break
              new ground in food, fashion, and crafts.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={FashionPost?.[0]} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={FashionPost.slice(1)} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore subCategory={FoodsubCategory.slice(0, 8)} main={"Food"} />
          </div>
          <div className={styles.max}>
            <Explore
              subCategory={FashionsubCategory.slice(0, 8)}
              main={"Fashion"}
            />
          </div>
          <div className={styles.max}>
            <Explore
              subCategory={CraftssubCategory.slice(0, 8)}
              main={"Crafts"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCraft;
