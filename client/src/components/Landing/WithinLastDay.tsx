import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllPaymentsAsync,
  getPaymentAsync,
} from "../../Slices/paymentSlice";
import { getPostsAsync } from "../../Slices/postSlice";
import styles from "./LandingPage.module.css";

function WithinLastDay() {
  const dispatch = useAppDispatch();
  const backing = useAppSelector((state: any) => state.payment);
  const [inLastDayFundedProject, setInLastDayFundedProject] = useState(0);
  const [inLastDayBacking, setInLastDayBacking] = useState(0);
  const [updatedInLastDayBacking, setUpdatedInLastDayBacking] = useState(0);
  useEffect(() => {
    let now = inLastDayBacking;
    const final = updatedInLastDayBacking;
    const clear = setInterval(() => {
      if (now < final) {
        now++;
        setInLastDayBacking((prev) => prev + 1);
      } else {
        clearInterval(clear);
      }
    }, 50);
  }, [updatedInLastDayBacking]);

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getAllPaymentsAsync()).then((res: any) => {
      if (res.payload.success) {
        let total = 0;
        let projectIdArray: string[] = [];
        res.payload.backings.forEach((backing: any) => {
          total = total + backing?.rewards?.backingdata?.total;
          if (!projectIdArray.includes(backing?.rewards?.backingdata?.id)) {
            projectIdArray.push(backing?.rewards?.backingdata?.id);
          }
        });
        setInLastDayBacking(total);
        setUpdatedInLastDayBacking(total);
        setInLastDayFundedProject(projectIdArray.length);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchNewFunded = setInterval(() => {
      dispatch(getAllPaymentsAsync()).then((res: any) => {
        if (res.payload.success) {
          let total = 0;
          let projectIdArray: string[] = [];
          res.payload.backings.forEach((backing: any) => {
            total = total + backing?.rewards?.backingdata?.total;
            if (!projectIdArray.includes(backing?.rewards?.backingdata?.id)) {
              projectIdArray.push(backing?.rewards?.backingdata?.id);
            }
          });
          setUpdatedInLastDayBacking(total);
          setInLastDayFundedProject(projectIdArray.length);
        }
      });
    }, 10000);

    return () => {
      clearInterval(fetchNewFunded);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.first}>
        Creative work shows us what's possible. <br />
        Help fund it here
      </h1>
      <div style={{ color: "gray" }}>WITHIN THE LAST DAY</div>
      <ul className={styles.info}>
        <li>
          <h1 style={{ color: "#037362", marginBottom: "0" }}>
            {inLastDayFundedProject}
          </h1>
          <h4 style={{ color: "gray" }}>projects funded</h4>
        </li>
        <li>
          <h1 style={{ color: "#037362", marginBottom: "0" }}>
            $
            {inLastDayBacking
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </h1>
          <h4 style={{ color: "gray" }}>projects funded</h4>
        </li>
        <li>
          <h1 style={{ color: "#037362", marginBottom: "0" }}>
            {backing?.backing?.backingNumber}
          </h1>
          <h4 style={{ color: "gray" }}>projects funded</h4>
        </li>
      </ul>
    </div>
  );
}

export default WithinLastDay;
