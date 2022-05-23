import React from "react";
import { Route, Routes } from "react-router-dom";
import UpdatesDetail from "./components/PostDetail/section/children/UpdatesDetail";
import PostCardDetailCommunity from "./components/PostDetail/section/PostCardDetailCommunity";
import PostCardDetailDescrip from "./components/PostDetail/section/PostCardDetailDescrip";
import PostCardDetailFaq from "./components/PostDetail/section/PostCardDetailFaq";
import PostCardDetailUpdates from "./components/PostDetail/section/PostCardDetailUpdates";

function PostCardCategory() {
  return (
    <Routes>
      <Route path="description" element={<PostCardDetailDescrip />} />
      <Route path="faq" element={<PostCardDetailFaq />} />
      <Route path="updates" element={<PostCardDetailUpdates />} />
      <Route path="comments" element={<PostCardDetailDescrip />} />
      <Route path="community" element={<PostCardDetailCommunity />} />
      <Route path="updates/:updateID" element={<UpdatesDetail />} />
    </Routes>
  );
}

export default PostCardCategory;
