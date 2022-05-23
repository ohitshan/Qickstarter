const express = require("express");
const router = express.Router();
const { Block } = require("../models/Block");

//=================================
//             Block
//=================================

router.post("/block", (req, res) => {
  const block = new Block(req.body);

  block.save((err, block) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, block });
  });
});

router.post("/unblock", (req, res) => {
  Block.findOneAndDelete({
    userId: req.body.userId,
    blockTarget: req.body.blockTarget,
  }).exec((err, unblock) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, unblock });
  });
});

router.post("/blocked", (req, res) => {
  Block.find({
    userId: req.body.userId,
    blockTarget: req.body.blockTarget,
  }).exec((err, block) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (block.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, blocked: result });
  });
});

router.post("/blockedList", (req, res) => {
  Block.find({
    userId: req.body.userId,
  })
    .populate("blockTarget")
    .exec((err, blocked) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({ success: true, blocked });
    });
});

module.exports = router;
