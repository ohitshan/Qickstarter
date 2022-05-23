import { Col, Row, Anchor } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { UploadPost } from "../../../Slices/postSlice";
import "../PostCardDetail.css";
import PostCardDetailFunding from "../PostCardDetailFunding";
import styles from "../PostDetail.module.css";
const { Link } = Anchor;

function PostCardDetailDescrip() {
  const [descrip, setDescrip] = useState("");
  const [fixedAnchor, setFixedAnchor] = useState(false);
  const post = useAppSelector(
    (state: { user: any; post: { getpost?: UploadPost[] } }) =>
      state.post?.getpost
  );
  useEffect(() => {
    if (post?.[0]?.description !== undefined) {
      setDescrip(post?.[0]?.description);
    }
  }, [descrip, post]);
  // console.log(props.fixed);
  window.addEventListener("scroll", function () {
    if (window.screen.width > 991) {
      if (window.scrollY > 855) {
        setFixedAnchor(true);
      } else if (window.scrollY <= 855) {
        setFixedAnchor(false);
      }
    } else {
      setFixedAnchor(false);
    }
  });

  return (
    // <div style={{ maxWidth: "1400px", width: "100%", marginTop: "50px" }}>
    <Row style={{ width: "100%" }}>
      <Col xs={0} sm={0} md={0} lg={2}>
        <Anchor
          affix={false}
          className="anchor"
          style={
            fixedAnchor
              ? { position: "fixed", top: 150, marginLeft: "10px" }
              : { marginLeft: "10px" }
          }
        >
          <Link href="#Story" title="STORY" className="story" />
          <Link href="#Risks" title="RISKS" className="risks" />
        </Anchor>
      </Col>
      <Col
        lg={16}
        md={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "1000px",
        }}
      >
        <div id="Story" style={{ width: "80%", margin: "0 30px" }}>
          <h1 style={{ textAlign: "start" }}>STORY</h1>
          <div dangerouslySetInnerHTML={{ __html: descrip }}></div>
        </div>
        <div id="Risks" style={{ width: "80%", margin: "0 30px" }}>
          <h1 style={{ textAlign: "start" }}>RISKS</h1>
          <div>
            {post?.[0]?.risk?.split("\n")?.map((line: any) => (
              <span>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      </Col>
      <Col lg={6} md={0} sm={0} xs={0}>
        <div
          className={fixedAnchor ? styles.rewardFixed : "hi"}
          style={{ position: "relative" }}
        >
          <PostCardDetailFunding />
        </div>
      </Col>
    </Row>
    // </div>
  );
}

export default PostCardDetailDescrip;
