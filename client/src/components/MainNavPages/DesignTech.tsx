import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import PostCard from "../Landing/PostCard";
import PostCardMain from "../Landing/PostCardMain";
import { NavBar } from "../NavBar/NavBar";
import styles from "../Landing/LandingPage.module.css";
import { Project } from "../types";
import { useAppDispatch } from "../../app/hooks";
import { SearchByCategoryAsync } from "../../Slices/postSlice";
import Explore from "./utils/Explore";

function DesignTech() {
  const dispatch = useAppDispatch();
  const [DesignPost, setDesignPost] = useState<Project[]>([]);
  const [TechPost, setTechPost] = useState<Project[]>([]);
  const DesignsubCategory = [
    "Architecture",
    "Civic Design",
    "Graphic Design",
    "Interactive Design",
    "Product Design",
    "Toys",
    "Typography",
  ];
  const TechnologysubCategory = [
    "3D Printing",
    "Apps",
    "Camera Equipment",
    "DIY Electronics",
    "Fabrication Tools",
  ];

  useEffect(() => {
    let Designbody = {
      main: "Design",
    };
    let techbody = {
      main: "Technology",
    };
    dispatch(SearchByCategoryAsync(Designbody)).then((res: any) => {
      if (res.payload.success) {
        setDesignPost(res.payload.posts);
      }
    });
    dispatch(SearchByCategoryAsync(techbody)).then((res: any) => {
      if (res.payload.success) {
        setTechPost(res.payload.posts);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.container}>
          <div style={{ padding: "30px" }}>
            <h1>Design & Tech</h1>
            <p style={{ fontSize: "18px" }}>
              From fine design to innovative tech, discover projects from
              creators working to build a more beautiful future.
            </p>
          </div>
          <Row gutter={60} className={styles.max}>
            <Col xs={24} md={14}>
              <div style={{ textAlign: "left" }}>FEATURED PROJECT</div>
              <PostCardMain item={DesignPost?.[0]} />
            </Col>
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #D9D9D9" }}>
              <div style={{ textAlign: "left" }}>RECOMMENDED FOR YOU</div>
              <PostCard item={DesignPost.slice(1)} />
            </Col>
          </Row>
          <div className={styles.max}>
            <Explore
              subCategory={DesignsubCategory.slice(0, 8)}
              main={"Design"}
            />
          </div>
          <div className={styles.max}>
            <Explore
              subCategory={TechnologysubCategory.slice(0, 8)}
              main={"Technology"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignTech;
