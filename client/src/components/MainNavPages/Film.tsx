import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { SearchByCategoryAsync } from "../../Slices/postSlice";
import { NavBar } from "../NavBar/NavBar";
import { Project } from "../types";
import styles from "../Landing/LandingPage.module.css";
import { Col, Row } from "antd";
import PostCardMain from "../Landing/PostCardMain";
import PostCard from "../Landing/PostCard";
import Explore from "./utils/Explore";

function Film() {
  const dispatch = useAppDispatch();
  const [FilmPost, setFilmPost] = useState<Project[]>([]);
  const subCategory = [
    "Action",
    "Animation",
    "Comedy",
    "Documentary",
    "Drama",
    "Experimental",
    "Family",
    "Fantasy",
    "Festivals",
    "Horror",
    "Shorts",
  ];

  useEffect(() => {
    let techbody = {
      main: "FilmVideo",
    };
    dispatch(SearchByCategoryAsync(techbody)).then((res: any) => {
      if (res.payload.success) {
        setFilmPost(res.payload.posts);
      }
    });
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Film</h1>
            <p style={{ fontSize: "18px" }}>
              Join forces with the intrepid filmmakers and festival creators
              changing the way stories get told on screen.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={FilmPost?.[0]} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={FilmPost.slice(1)} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore subCategory={subCategory.slice(0, 8)} main={"Film"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Film;
