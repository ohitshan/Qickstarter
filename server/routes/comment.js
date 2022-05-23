const express = require("express");
const { Comment } = require("../models/Comment");
const router = express.Router();

//=================================
//            Comment
//=================================

router.post("/getComments", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId };
  }

  Comment.find(variable)
    .populate("userId")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      let Comments = comments.filter(
        (commentInfo) => commentInfo.responseTo === undefined
      );
      res.status(200).json({ success: true, Comments, comments });
    });
});

router.post("/getAllMyComments", (req, res) => {
  let variable = { userId: req.body.userId };
  console.log(req.body);
  Comment.find(variable)
    .populate("postId")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/getReplyComments", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, responseTo: req.body.responseTo };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId, responseTo: req.body.responseTo };
  }
  Comment.find(variable)
    .populate("userId")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/comment", (req, res) => {
  console.log(req.body);

  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("userId")
      .exec((err, result) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comment });
      });
  });
});

module.exports = router;
