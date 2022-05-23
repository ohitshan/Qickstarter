import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { followerListAsync } from "../../../../../../Slices/subscribeSlice";
import { Writer } from "../../../../../types";
import FollowerListForm from "./FollowerListForm";

function Followers() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    let body = {
      userId: user?.authUser?._id,
    };
    dispatch(followerListAsync(body)).then((res: any) => {
      if (res.payload.success) {
        console.log(res);
        setFollowerList(res.payload.filtered);
      }
    });
  }, [user, dispatch]);
  console.log(followerList);
  return (
    <div style={{ maxWidth: "1000px", width: "100%", marginTop: "30px" }}>
      {followerList?.map((item: { _id: string; userFrom: Writer }) => (
        <FollowerListForm item={item} key={item._id} />
      ))}
    </div>
  );
}

export default Followers;
