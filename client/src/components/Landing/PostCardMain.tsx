import { Card } from "antd";
import { Link } from "react-router-dom";
import { Project } from "../types";
import LikeRemindDiv from "./LikeRemindDiv";
import styles from "./LandingPage.module.css";
const { Meta } = Card;
interface PostCardMainProps {
  item: Project;
}
function PostCardMain({ item }: PostCardMainProps) {
  return (
    <div
      style={{
        margin: "10px",
        position: "relative",
      }}
    >
      <Card
        className={styles.postCardMain}
        hoverable
        cover={
          <Link to={`/post/${item?._id}/description`}>
            <img
              style={{ maxHeight: "400px", width: "100%" }}
              alt="example"
              src={
                item?.images?.[0]?.filePath
                  ? `http://localhost:5000/${item?.images?.[0]?.filePath}`
                  : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              }
            />
          </Link>
        }
      >
        <Meta
          style={{ textAlign: "left" }}
          title={<h1>{item?.title?.title}</h1>}
          description={
            <div>
              <h4>{item?.title?.subtitle}</h4>
              <p>by {item?.writer?.email}</p>
            </div>
          }
        />
      </Card>
      <div className={styles.likeComponent}>
        <LikeRemindDiv item={item} />
      </div>
    </div>
  );
}

export default PostCardMain;
