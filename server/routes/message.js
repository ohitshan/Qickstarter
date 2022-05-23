const express = require("express");
const { Block } = require("../models/Block");
const router = express.Router();
const { Message } = require("../models/Message");

//=================================
//             Message
//=================================

router.post("/sendMessage", (req, res) => {
  const message = new Message(req.body);

  message.save((err, message) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, message });
  });
});
// { $or: [ { "title": "article01" }, { "writer": "Alpha" } ] }
router.post("/getAllMessage", (req, res) => {
  Message.find({ $or: [{ userFrom: req.body.id }, { userTo: req.body.id }] })
    .populate("userFrom")
    .populate("userTo")
    .exec((err, message) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, message });
    });
});

router.post("/getInboxMessage", (req, res) => {
  Message.find({ userTo: req.body.id })
    .populate("userFrom")
    .populate("userTo")
    .exec((err, message) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, message });
    });
});

router.post("/getUnreadMessage", (req, res) => {
  Message.find({ userTo: req.body.id, isRead: false })
    .populate("userFrom")
    .populate("userTo")
    .exec((err, message) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, message });
    });
});

router.post("/getSentMessage", (req, res) => {
  Message.find({ userFrom: req.body.id })
    .populate("userFrom")
    .populate("userTo")
    .exec((err, message) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, message });
    });
});

router.post("/readMessage", (req, res) => {
  console.log(req.body.id);
  Message.findOneAndUpdate(
    { _id: req.body.id },
    { isRead: true },
    { new: true },
    (err, message) => {
      if (err) return res.json({ read: false, err });
      return res.status(200).json({
        read: true,
        message,
      });
    }
  );
});

module.exports = router;
