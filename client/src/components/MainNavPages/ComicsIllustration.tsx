import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import PostCard from "../Landing/PostCard";
import PostCardMain from "../Landing/PostCardMain";
import { NavBar } from "../NavBar/NavBar";
import styles from "../Landing/LandingPage.module.css";
import { useAppDispatch } from "../../app/hooks";
import { Project } from "../types";
import { SearchByCategoryAsync } from "../../Slices/postSlice";
import Explore from "./utils/Explore";
function ComicsIllustration() {
  const dispatch = useAppDispatch();
  const [ComicsPost, setComicsPost] = useState<Project[]>([]);

  const subCategory = [
    "Anthologies",
    "Comic Books",
    "Events",
    "Graphic Novels",
    "Webcomics",
  ];

  useEffect(() => {
    const category = window.location.href.split("/").reverse()[0];
    const comic = category.split("&")[0];
    const illustration = category.split("&")[1];
    console.log(comic, illustration);

    let body = {
      main: comic,
    };
    dispatch(SearchByCategoryAsync(body)).then((res: any) => {
      if (res.payload.success) {
        console.log(res);
        setComicsPost(res.payload.posts);
      }
    });
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Comics & Illustration</h1>
            <p style={{ fontSize: "18px" }}>
              Explore fantastical worlds and original characters from
              Kickstarter’s community of comics creators and illustrators.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14} style={{ padding: "10px" }}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={ComicsPost?.[0]} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={ComicsPost.slice(1)} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore subCategory={subCategory} main={"Comics"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicsIllustration;
