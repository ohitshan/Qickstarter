import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getBackedPostsAsync } from "../../../../Slices/postSlice";
import SearchedProjectForm from "../../../Search/SearchedProjectForm";
import { Project } from "../../../types";
import styles from "../../../UserSetting/saved/SavedProject.module.css";
import { useOutletContext } from "react-router-dom";
import { Writer } from "../../../types";

function Backed() {
  const user = useAppSelector((state: any) => state.user);
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [projectList, setProjectList] = useState([]);
  const dispatch = useAppDispatch();
  const outlet: Writer = useOutletContext();
  useEffect(() => {
    let projectList: string[] = [];
    outlet?.history?.forEach((item: { backingdata: { id: string } }) => {
      projectList.push(item?.backingdata?.id);
      setProjectIds(projectList);
    });
  }, [outlet]);
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
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      {outlet?.history?.length !== 0 ? (
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
        <div>
          {outlet?._id === user?.authUser?._id ? (
            <div style={{ fontSize: "24px", marginTop: "40px" }}>
              <b>You haven't backed any projects.</b> Let's change that!
              <br />
              <Link to={`/search`}>Discover projects</Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Backed;
