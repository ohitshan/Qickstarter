const express = require("express");
const { Payment } = require("../models/Payment");
const router = express.Router();

//=================================
//            Payment
//=================================

router.post("/getPayments", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { id: req.body.postId };
  }
  Payment.find({
    "rewards.backingdata.id": req.body.postId,
  })
    // .populate("user")
    .exec((err, payments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, payments });
    });
});
router.post("/getAllPayments", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  const today = new Date();
  let yesterday = new Date(today.setDate(today.getDate() - 1));
  console.log(yesterday);
  Payment.find({ createdAt: { $gt: yesterday } })
    // .populate("writer")
    // .skip(skip)
    // .limit(limit)
    .exec((err, backings) => {
      // console.log((yesterday - backings[0].createdAt) / (1000 * 3600 * 24));
      if (err) return res.status(400).send(err);
      res
        .status(200)
        .json({ success: true, backingNumber: backings.length, backings });
    });
});

module.exports = router;
