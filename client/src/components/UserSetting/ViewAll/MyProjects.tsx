import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { MyProjectAsync } from "../../../Slices/postSlice";
import SearchedProjectForm from "../../Search/SearchedProjectForm";
import { Project } from "../../types";
import styles from "./MyProjects.module.css";

function MyProjects() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state?.user);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    let body = {
      id: user?.authUser?._id,
    };
    dispatch(MyProjectAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setMyPosts(res.payload.posts);
      }
    });
  }, [dispatch, user]);

  return (
    <div
      style={{
        background: "#F0F0F0",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1000px", width: "100%" }}>
        <ul className={styles.navli}>
          <li>
            <Link to={"/Activity"}>Activity</Link>
          </li>
          <li>
            <Link to={"/myBacked"}>Backed projects</Link>
          </li>
          <li>
            <Link to={"/myProject"}>Created projects</Link>
          </li>
          <li>
            <Link to={"/settings/Account"}>Settings</Link>
          </li>
          <li>
            <Link to={`/profile/${user?.authUser?._id}`}>Profile</Link>
          </li>
        </ul>
        <div style={{ textAlign: "start" }}>
          <div style={{ fontSize: "48px", fontWeight: "600" }}>
            Created projects
          </div>
          <div style={{ fontSize: "24px" }}>
            A place to keep track of all your created projects
          </div>
        </div>
        <div
          className={styles.searchContentContainer}
          style={{ marginTop: "30px", textAlign: "start" }}
        >
          {myPosts.map((item: Project) => (
            <div className={styles.girdItem} key={item._id}>
              <SearchedProjectForm item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
