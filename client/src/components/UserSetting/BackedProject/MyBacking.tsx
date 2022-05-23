import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getBackedPostsAsync } from "../../../Slices/postSlice";
import SearchedProjectForm from "../../Search/SearchedProjectForm";
import { Project } from "../../types";
import styles from "../ViewAll/MyProjects.module.css";

function MyBacking() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state?.user);
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    let projectList: string[] = [];
    user?.authUser?.history?.forEach(
      (item: { backingdata: { id: string } }) => {
        projectList.push(item?.backingdata?.id);
        setProjectIds(projectList);
      }
    );
  }, [user]);
  useEffect(() => {
    let body = {
      id: projectIds,
    };
    if (projectIds.length !== 0) {
      dispatch(getBackedPostsAsync(body)).then((res: any) =>
        setProjectList(res.payload.posts)
      );
    }
  }, [dispatch, projectIds]);

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
            Backed projects
          </div>
          <div style={{ fontSize: "24px" }}>
            A place to keep track of all your backed projects
          </div>
        </div>

        {projectList?.length !== 0 ? (
          <div
            className={styles.searchContentContainer}
            style={{ marginTop: "30px", textAlign: "start" }}
          >
            {projectList.map((item: Project) => (
              <div key={item._id}>
                <SearchedProjectForm item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{ fontSize: "24px", marginTop: "40px", textAlign: "start" }}
          >
            <b>You haven't backed any projects.</b> Let's change that!
            <br />
            <Link to={`/search`}>Discover projects</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBacking;
