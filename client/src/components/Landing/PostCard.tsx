import {
  List,
  //  Avatar, Space
} from "antd";
// import styles from "./LandingPage.module.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import PostCardListForm from "./PostCardListForm";
import { Project } from "../types";

interface RandomIndexProps {
  item: Project[];
}

function PostCard({ item }: RandomIndexProps) {
  const post = useAppSelector((state: any) => state.post);
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   setPosts(post.getpost?.posts);
  // }, [post]);

  return (
    <div>
      <List
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={item}
        renderItem={(item: any) => <PostCardListForm item={item} />}
      />
    </div>
  );
}

export default PostCard;
