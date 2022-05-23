import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getRemindAsync } from "../../../Slices/remindSlice";
import SavedProjectForm from "./SavedProjectForm";
import styles from "./SavedProject.module.css";
import { useNavigate } from "react-router-dom";

function SavedProjects() {
  const navigate = useNavigate();
  const user = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [RemindProjects, setRemindProjects] = useState([]);
  useEffect(() => {
    let body = {
      userId: user?.authUser?._id,
    };
    dispatch(getRemindAsync(body)).then((res: any) => {
      if (res?.payload?.success) {
        setRemindProjects(res?.payload?.reminds);
      }
    });
  }, [dispatch, user]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        className={
          RemindProjects.length === 0
            ? styles.savedTitle
            : styles.haveSavedTitle
        }
      >
        Saved projects
        {RemindProjects.length === 0 ? null : (
          <p style={{ fontSize: "18px" }}>
            You’ll receive two email reminders within the final 48 hours of each
            project. We’ll also use these selections to improve your
            recommendations, which you can turn off in the privacy section of
            your account settings.
          </p>
        )}
      </div>
      <div className={styles.savedContentContainer}>
        {RemindProjects.length === 0 ? (
          <div
            style={{
              minHeight: "208px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              fontSize: "18px",
            }}
          >
            Thousands of creative projects are coming to life right now. When
            you ask us to remind you about one, it’ll show up here.
            <Button
              style={{
                marginTop: "30px",
                background: "#464646",
                color: "white",
                height: "40px",
              }}
              onClick={() => {
                navigate("/search");
              }}
            >
              Discover projects
            </Button>
          </div>
        ) : (
          <div style={{ marginTop: "30px", textAlign: "start" }}>
            <h2>saved projects</h2>
            <div className={styles.gridContainer}>
              {RemindProjects.map((item) => (
                <div className={styles.girdItem}>
                  <SavedProjectForm item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedProjects;
