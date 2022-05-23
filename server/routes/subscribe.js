const express = require("express");
const { Block } = require("../models/Block");
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             subscribe
//=================================

router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, subscribe) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, subscribe });
  });
});

router.post("/unsubscribe", (req, res) => {
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, unsubscribe) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, unsubscribe });
  });
});

router.post("/subscribed", (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, subscribed: result });
  });
});

// router.post("/followerLists", (req, res) => {
//   Subscriber.find({ userTo: req.body.userId })
//     .populate("userFrom")
//     .exec((err, follower) => {
//       if (err) return res.status(400).send(err);
//       console.log(follower)
//       res.status(200).json({ success: true, follower });
//     });
// });

router.post("/followerLists", (req, res) => {
  Subscriber.find({ userTo: req.body.userId })
    .populate("userFrom")
    .exec((err, follower) => {
      if (err) return res.status(400).send(err);

      Block.find({ userId: req.body.userId })
        .populate("blockTarget")
        .exec((err, block) => {
          if (err) return res.status(400).send(err);

          let blockIdLists = [];
          block?.forEach((user) => {
            blockIdLists.push(user?.blockTarget?.email);
          });
          let filtered = follower.filter(
            (userInfo) => !blockIdLists.includes(userInfo?.userFrom?.email)
          );
          res.status(200).json({ success: true, filtered });
        });
    });
});

router.post("/followingLists", (req, res) => {
  Subscriber.find({ userFrom: req.body.userId })
    .populate("userTo")
    .exec((err, following) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, following });
    });
});

module.exports = router;
