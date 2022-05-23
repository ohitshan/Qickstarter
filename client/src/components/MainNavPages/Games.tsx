import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { SearchByCategoryAsync } from "../../Slices/postSlice";
import styles from "../Landing/LandingPage.module.css";
import PostCard from "../Landing/PostCard";
import PostCardMain from "../Landing/PostCardMain";
import { NavBar } from "../NavBar/NavBar";
import { Project } from "../types";
import Explore from "./utils/Explore";

function Games() {
  const dispatch = useAppDispatch();
  const [GamePost, setGamePost] = useState<Project[]>([]);
  const subCategory = [
    "Gaming Hardware",
    "Live Games",
    "Mobile Games",
    "Playing Cards",
    "Puzzles",
    "Tabletop Games",
    "Video Games",
  ];

  useEffect(() => {
    let Gamebody = {
      main: "Games",
    };

    dispatch(SearchByCategoryAsync(Gamebody)).then((res: any) => {
      if (res.payload.success) {
        setGamePost(res.payload.posts);
      }
    });
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Games</h1>
            <p style={{ fontSize: "18px" }}>
              From tabletop adventures to beloved revivals, discover the
              projects forging the future of gameplay.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={GamePost?.[0]} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={GamePost.slice(1)} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore subCategory={subCategory.slice(0, 8)} main={"Games"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
