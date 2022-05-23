import { Progress } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { getPaymentAsync } from "../../../Slices/paymentSlice";
import { Project } from "../../types";
import styles from "./SavedProject.module.css";

interface SavedProjectProps {
  item: { postId: Project };
}

function SavedProjectForm({ item }: SavedProjectProps) {
  const dispatch = useAppDispatch();
  const [TotalMoney, setTotalMoney] = useState(0);
  const projectReleaseDate = new Date(item.postId.launch);
  const projectFinishDate = new Date(projectReleaseDate);
  projectFinishDate.setDate(
    projectReleaseDate.getDate() + Number(item.postId.duration)
  );
  const DateNow = new Date();
  const diff = projectFinishDate.getTime() - DateNow.getTime();
  const diffDays = diff / (24 * 60 * 60 * 1000);
  console.log(projectReleaseDate);
  useEffect(() => {
    let body = {
      postId: item?.postId?._id,
    };
    dispatch(getPaymentAsync(body)).then((res: any) => {
      if (res.payload.success) {
        let total = 0;
        res.payload.payments?.forEach(
          (payment: any) =>
            (total = total + payment.rewards?.backingdata?.total)
        );
        setTotalMoney(total);
      }
    });
  }, [dispatch, item]);
  console.log(item);
  return (
    <div style={{ border: "1px solid #D9D9D9" }}>
      <Link to={`/post/${item?.postId?._id}/description`}>
        <img
          alt="main"
          src={`http://localhost:5000/${item?.postId?.images?.[0]?.filePath}`}
          width="100%"
        />
      </Link>
      <div style={{ padding: "20px" }}>
        <div style={{ minHeight: "204" }}>
          <Link to={`/post/${item?.postId?._id}/description`}>
            <div className={styles.savedProjectTitleInfo}>
              <h2 className={styles.savedProjectTitle}>
                {item?.postId?.title.title}
              </h2>
              <p>{item?.postId?.title.subtitle}</p>
            </div>
          </Link>
          <p>
            by{" "}
            <span className={styles.userInfo}>
              {item?.postId?.writer?.email}
            </span>
          </p>
        </div>
        <Progress
          strokeColor={"#028858"}
          showInfo={false}
          percent={Math.round((TotalMoney / item?.postId?.funding) * 100)}
        />
        <div>
          <h5 style={{ color: "#028858 " }}>${TotalMoney} pledged</h5>
          <h5>
            {Math.round((TotalMoney / item?.postId?.funding) * 100)}% funded
          </h5>
          <h5>{Math.round(diffDays)} days to go</h5>
          <p>
            <a>{item.postId.category.PrimaryCategory}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SavedProjectForm;
