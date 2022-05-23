import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getPostByIdAsync } from "../../Slices/postSlice";
import PostCardDetailFundingForm from "./PostCardDetailFundingForm";
import PostCardDetailProfileForm from "./PostCardDetailProfile/PostCardDetailProfileForm";

function PostCardDetailFunding() {
  const { postID } = useParams();
  const dispatch = useAppDispatch();
  const [reward, setReward] = useState<any>([]);

  useEffect(() => {
    dispatch(getPostByIdAsync(postID)).then((res: any) =>
      setReward(res.payload[0].reward)
    );
  }, [dispatch, postID]);
  console.log(reward);
  return (
    <div
      style={{
        overflow: "scroll",
        height: "90%",
        width: "100%",
        textAlign: "start",
        padding: "0px 40px 40px 0px",
      }}
    >
      <PostCardDetailProfileForm />
      <h1>Support</h1>
      {/* <div style={{ padding: "20px" }}>
      <span>Pledge without a reward</span>
      <Input
        addonBefore="€"
        value={amount}
        showCount
        maxLength={5}
        onChange={onChange}
        placeholder="please put only number"
      />
      </div> */}
      {reward.map((reward: any, i: number) => (
        <PostCardDetailFundingForm reward={reward} key={i} />
      ))}
    </div>
  );
}

export default PostCardDetailFunding;
