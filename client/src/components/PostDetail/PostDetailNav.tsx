import { Badge, Menu } from "antd";
import { Link, useParams } from "react-router-dom";
import styles from "./PostDetail.module.css";
import "./PostDetail.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { getCommentsAsync } from "../../Slices/commentSlice";

// const { SubMenu } = Menu;
interface PropsValue {
  postid: string | undefined;
  fixed: boolean;
  screen: boolean;
  small: boolean;
}

export const PostDetailNav = (props: PropsValue) => {
  const post = useAppSelector((state: any) => state.post);
  const [CommentNumber, setCommentNumber] = useState(0);
  const dispatch = useAppDispatch();
  const projectParams = useParams();
  useEffect(() => {
    let body = {
      postId: projectParams.postID,
    };
    dispatch(getCommentsAsync(body)).then((res: any) =>
      setCommentNumber(res.payload?.comments?.length)
    );
  }, [dispatch, projectParams]);
  return (
    <div
      className={
        props.screen
          ? props.small
            ? styles.navFixed
            : styles.nav
          : props.fixed
          ? styles.navFixed
          : styles.nav
      }
    >
      <Menu
        className={styles.menuContainer}
        mode="horizontal"
        defaultSelectedKeys={[
          `${
            window.location.href.split("/")[
              window.location.href.split("/").length - 1
            ]
          }`,
        ]}
      >
        <Menu.Item key="description">
          <Link to={`/post/${props.postid}/description`}>
            <Badge>Campaign</Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="faq">
          <Link to={`/post/${props.postid}/faq`}>
            <Badge
              count={
                post?.payload
                  ? post?.payload?.postInfo?.answerfaq?.length
                  : post?.getpost?.[0]?.answerfaq?.length
              }
              offset={[10, -5]}
            >
              FAQ
            </Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="updates">
          <Link to={`/post/${props.postid}/updates`}>
            <Badge
              count={
                post?.payload
                  ? post?.payload?.postInfo?.updates?.length
                  : post?.getpost?.[0]?.updates?.length
              }
              offset={[10, -5]}
            >
              Updates
            </Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="comments">
          <Link to={`/post/${props.postid}/comments`}>
            <Badge count={CommentNumber} offset={[10, -5]}>
              Comments
            </Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="community">
          <Link to={`/post/${props.postid}/community`}>
            <Badge>Community</Badge>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
