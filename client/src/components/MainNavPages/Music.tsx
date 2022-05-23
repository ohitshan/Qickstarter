import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Project } from "../types";
import styles from "../Landing/LandingPage.module.css";
import { SearchByCategoryAsync } from "../../Slices/postSlice";
import { NavBar } from "../NavBar/NavBar";
import { Col, Row } from "antd";
import PostCardMain from "../Landing/PostCardMain";
import PostCard from "../Landing/PostCard";
import Explore from "./utils/Explore";

function Music() {
  const dispatch = useAppDispatch();
  const [MusicPost, setMusicPost] = useState<Project[]>([]);
  const subCategory = [
    "Blues",
    "Chiptune",
    "Classical Music",
    "Comedy",
    "Country & Folk",
    "Hip-Hop",
    "Jazz",
    "Latin",
    "Metal",
  ];

  useEffect(() => {
    let Gamebody = {
      main: "Music",
    };

    dispatch(SearchByCategoryAsync(Gamebody)).then((res: any) => {
      if (res.payload.success) {
        setMusicPost(res.payload.posts);
      }
    });
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Music</h1>
            <p style={{ fontSize: "18px" }}>
              Discover new albums, performances, and independent venues from
              creators using Kickstarter to shape the future of sound.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={MusicPost?.[0]} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={MusicPost.slice(1)} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore subCategory={subCategory.slice(0, 8)} main={"Music"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;
