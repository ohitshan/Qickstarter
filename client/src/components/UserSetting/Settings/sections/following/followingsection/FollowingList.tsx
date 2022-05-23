import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { followingListAsync } from "../../../../../../Slices/subscribeSlice";
import { Writer } from "../../../../../types";
import FollowingListForm from "./FollowingListForm";

function FollowingList() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [followingList, setFollowingList] = useState([]);
  useEffect(() => {
    let body = {
      userId: user?.authUser?._id,
    };
    dispatch(followingListAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setFollowingList(res.payload.following);
      }
    });
  }, [user, dispatch]);

  return (
    <div style={{ maxWidth: "1000px", width: "100%", marginTop: "30px" }}>
      {followingList?.map((item: { _id: string; userTo: Writer }) => (
        <FollowingListForm item={item} key={item._id} />
      ))}
    </div>
  );
}

export default FollowingList;
