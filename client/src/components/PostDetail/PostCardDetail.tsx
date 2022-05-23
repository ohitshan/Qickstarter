import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getPostByIdAsync } from "../../Slices/postSlice";
import { Row, Col, Anchor } from "antd";
import PostDetailImage from "./PostDetailImage";
import PostDetailInfo from "./PostDetailInfo";
import styles from "./PostDetail.module.css";
import PostDetailLineTagRow from "./PostDetailLineTagRow";
import { PostDetailNav } from "./PostDetailNav";

const { Link } = Anchor;
function PostCardDetail() {
  const { postID } = useParams();
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<any>([]);
  const [fixedBar, setFixedBar] = useState(false);
  const [smallFixedBar, setSmallFixedBar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(false);
  useEffect(() => {
    dispatch(getPostByIdAsync(postID)).then((res: any) => setPost(res.payload));
  }, [dispatch, postID]);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 855) {
      setFixedBar(true);
    } else {
      setFixedBar(false);
    }
    if (window.scrollY > 1300) {
      setSmallFixedBar(true);
    } else {
      setSmallFixedBar(false);
    }
    if (window.innerWidth < 991) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
  });
  return (
    <div className={styles.container}>
      <h2>{post?.[0]?.title?.title}</h2>
      <h4>{post?.[0]?.title?.subtitle}</h4>

      <div className={styles.main} id="main">
        <Row gutter={[16, 16]}>
          <Col lg={14} sm={24}>
            <PostDetailImage post={post?.[0]} />
          </Col>
          <Col lg={10} sm={24}>
            <PostDetailInfo />
          </Col>
        </Row>
      </div>
      <div className={styles.linetag} id="linetag">
        <PostDetailLineTagRow />
      </div>
      {/* <div className={fixedBar ? styles.navFixed : styles.nav}> */}
      <PostDetailNav
        postid={postID}
        fixed={fixedBar}
        small={smallFixedBar}
        screen={screenWidth}
      />
      {/* </div> */}
      <div
        id="anchor"
        style={{ maxWidth: "1400px", width: "100%", marginTop: "50px" }}
      >
        <Outlet context={fixedBar} />
      </div>
    </div>
  );
}

export default PostCardDetail;
