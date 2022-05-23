import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import PostCard from "../Landing/PostCard";
import PostCardMain from "../Landing/PostCardMain";
import { NavBar } from "../NavBar/NavBar";
import { Project } from "../types";
import styles from "../Landing/LandingPage.module.css";
import { useAppDispatch } from "../../app/hooks";
import { SearchByCategoryAsync } from "../../Slices/postSlice";
import Explore from "./utils/Explore";

function Arts() {
  const dispatch = useAppDispatch();
  const [ArtsPost, setArtsPost] = useState<Project[]>([]);
  const [randomPost, setRandomPost] = useState<Project>();
  const subCategory = [
    "Ceramics",
    "Conceptual Art",
    "Digital Art",
    "Illustration",
    "Installation",
    "Mixed Media",
    "Painting",
    "Performance Art",
    "Public Art",
    "Sculpture",
    "Social Practice",
    "Textiles",
    "Video Art",
  ];

  useEffect(() => {
    let body = {
      main: "Art",
    };
    dispatch(SearchByCategoryAsync(body)).then((res: any) => {
      if (res.payload.success) {
        const random = Math.floor(Math.random() * res.payload.posts.length);
        let newPostsList = [...res.payload?.posts];
        let spliceOne: Project = newPostsList?.splice(random, 1)?.[0];
        setRandomPost(spliceOne);
        setArtsPost(newPostsList);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Arts</h1>
            <p style={{ fontSize: "18px" }}>
              Discover the artists and organizations using Kickstarter to
              realize ambitious projects in visual art and performance.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14} style={{ padding: "10px" }}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={randomPost!} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={ArtsPost} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore subCategory={subCategory} main={"Art"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Arts;
