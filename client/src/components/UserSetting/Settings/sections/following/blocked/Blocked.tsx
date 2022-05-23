import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { blockedListAsync } from "../../../../../../Slices/blockSlice";
import { Writer } from "../../../../../types";
import BlockedListForm from "./BlockedListForm";

function Blocked() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [blockedList, setBlockedList] = useState([]);

  useEffect(() => {
    let body = {
      userId: user?.authUser?._id,
    };
    dispatch(blockedListAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setBlockedList(res.payload.blocked);
      }
    });
  }, [user, dispatch]);

  return (
    <div style={{ maxWidth: "1000px", width: "100%", marginTop: "30px" }}>
      {blockedList?.map((item: { _id: string; blockTarget: Writer }) => (
        <BlockedListForm item={item} key={item._id} />
      ))}
    </div>
  );
}

export default Blocked;
