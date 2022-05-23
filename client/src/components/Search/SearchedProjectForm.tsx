import { Progress } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getPaymentAsync } from "../../Slices/paymentSlice";
import { Project } from "../types";
import styles from "../UserSetting/saved/SavedProject.module.css";

interface SavedProjectProps {
  item: Project;
}

function SearchedProjectForm({ item }: SavedProjectProps) {
  const dispatch = useAppDispatch();
  const [TotalMoney, setTotalMoney] = useState(0);
  const projectReleaseDate = new Date(item?.launch);
  const projectFinishDate = new Date(projectReleaseDate);
  projectFinishDate.setDate(
    projectReleaseDate.getDate() + Number(item?.duration)
  );
  const DateNow = new Date();
  const diff = projectFinishDate.getTime() - DateNow.getTime();
  const diffDays = diff / (24 * 60 * 60 * 1000);
  useEffect(() => {
    let body = {
      postId: item?._id,
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

  return (
    <div style={{ border: "1px solid #D9D9D9" }}>
      <Link to={`/post/${item?._id}/description`}>
        <img
          alt="main"
          src={
            item?.images?.[0]?.filePath
              ? `http://localhost:5000/${item?.images?.[0]?.filePath}`
              : `https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png`
          }
          width="100%"
        />
      </Link>
      <div style={{ padding: "20px" }}>
        <div style={{ minHeight: "204" }}>
          <Link to={`/post/${item?._id}/description`}>
            <div className={styles.savedProjectTitleInfo}>
              <h2 className={styles.savedProjectTitle}>{item?.title.title}</h2>
              <p>{item?.title.subtitle}</p>
            </div>
          </Link>
          <p>
            by <span className={styles.userInfo}>{item?.writer?.email}</span>
          </p>
        </div>
        <Progress
          strokeColor={"#028858"}
          showInfo={false}
          percent={Math.round((TotalMoney / item?.funding) * 100)}
        />
        <div>
          <h5 style={{ color: "#028858 " }}>${TotalMoney} pledged</h5>
          <h5>{Math.round((TotalMoney / item?.funding) * 100)}% funded</h5>
          <h5>{Math.round(diffDays)} days to go</h5>
          <p>
            <a>{item?.category?.PrimaryCategory}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchedProjectForm;
