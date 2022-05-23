const express = require("express");
const { Dislike } = require("../models/Dislike");
const router = express.Router();
const { Like } = require("../models/Like");

//=================================
//            Like
//=================================

router.post("/getLikes", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId };
  }
  Like.find(variable)
    .populate("userId")
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes });
    });
});

router.post("/getAllmyLikes", (req, res) => {
  let variable = { userId: req.body.userId };

  Like.find(variable)
    .populate("postId")
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes });
    });
});

router.post("/getMyLikes", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId, userId: req.body.userId };
  }

  Like.find(variable).exec((err, mylikes) => {
    if (err) return res.status(400).send(err);
    let isLiked = false;
    if (mylikes.length === 1) {
      isLiked = true;
    } else {
      isLiked = false;
    }
    res.status(200).json({ success: true, isLiked });
  });
});

router.post("/getMyDislikes", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId, userId: req.body.userId };
  }

  Dislike.find(variable).exec((err, myDislikes) => {
    if (err) return res.status(400).send(err);
    let isDisliked = false;
    if (myDislikes.length === 1) {
      isDisliked = true;
    } else {
      isDisliked = false;
    }
    res.status(200).json({ success: true, isDisliked });
  });
});

router.post("/getDislikes", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId };
  }
  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/like", (req, res) => {
  let variable = {};
  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId, userId: req.body.userId };
  }

  const like = new Like(variable);

  like.save((err, likeInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, likeInfo });
  });
});

router.post("/unlike", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId, userId: req.body.userId };
  }

  Like.findOneAndDelete(variable).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, info });
  });
});

router.post("/dislike", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  }

  const dislike = new Dislike(variable);

  dislike.save((err, dislikeInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, dislikeInfo });
  });
});

router.post("/undislike", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  }

  Dislike.findOneAndDelete(variable).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, info });
  });
});

module.exports = router;
