import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getPostsAsync } from "../../Slices/postSlice";
import First from "./First";
import PostCard from "./PostCard";
import { Row, Col } from "antd";
import styles from "./LandingPage.module.css";
import PostCardMain from "./PostCardMain";
import { NavBar } from "../NavBar/NavBar";
import { Project } from "../types";

function LandingPage() {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<Project[]>([]);
  const [randomPost, setRandomPost] = useState<Project>();
  useEffect(() => {
    dispatch(getPostsAsync()).then((res: any) => {
      const random = Math.floor(Math.random() * res.payload.posts.length);
      let newPostsList = [...res.payload?.posts];
      let spliceOne: Project = newPostsList?.splice(random, 1)?.[0];
      setRandomPost(spliceOne);
      setPosts(newPostsList);
    });
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <First />
        <Row gutter={60} className={styles.max}>
          <Col xs={24} md={14}>
            <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
            <PostCardMain item={randomPost!} />
          </Col>
          <Col xs={24} md={10}>
            <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
            <PostCard item={posts} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LandingPage;
