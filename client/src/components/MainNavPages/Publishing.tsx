import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { SearchByCategoryAsync } from "../../Slices/postSlice";
import PostCard from "../Landing/PostCard";
import PostCardMain from "../Landing/PostCardMain";
import { NavBar } from "../NavBar/NavBar";
import { Project } from "../types";
import Explore from "./utils/Explore";
import styles from "../Landing/LandingPage.module.css";

function Publishing() {
  const dispatch = useAppDispatch();
  const [PublishingPost, setPublishingPost] = useState<Project[]>([]);
  const [JournalismPost, setJournalismPost] = useState<Project[]>([]);
  const PublishingsubCategory = [
    "Academic",
    "Anthologies",
    "Art Books",
    "Calendars",
    "Comedy",
  ];
  const JournalismsubCategory = ["Audio", "Photo", "Print", "Video", "Web"];
  useEffect(() => {
    let Publishingbody = {
      main: "Publishing",
    };
    let Journalismbody = {
      main: "Journalism",
    };
    dispatch(SearchByCategoryAsync(Publishingbody)).then((res: any) => {
      if (res.payload.success) {
        setPublishingPost(res.payload.posts);
      }
    });
    dispatch(SearchByCategoryAsync(Journalismbody)).then((res: any) => {
      if (res.payload.success) {
        setJournalismPost(res.payload.posts);
      }
    });
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Publishing</h1>
            <p style={{ fontSize: "18px" }}>
              Explore how writers and publishers are using Kickstarter to bring
              new literature, periodicals, podcasts, and more to life.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={PublishingPost?.[0]} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={PublishingPost.slice(1)} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore subCategory={PublishingsubCategory} main={"Publishing"} />
          </div>
          <div className={styles.max}>
            <Explore subCategory={JournalismsubCategory} main={"Journalism"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publishing;
