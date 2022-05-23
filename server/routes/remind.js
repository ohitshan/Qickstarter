const express = require("express");
const router = express.Router();
const { Remind } = require("../models/Remind");

//=================================
//            Remind
//=================================

router.post("/getreminds", (req, res) => {
  let variable = { userId: req.body.userId };

  Remind.find(variable)
    .populate({
      path: "postId",
      populate: {
        path: "writer",
      },
    })
    .exec((err, reminds) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, reminds });
    });
});

router.post("/remind", (req, res) => {
  let variable = {};
  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else if (req.body.updateId) {
    variable = { updateId: req.body.updateId, userId: req.body.userId };
  }

  Remind.findOneAndDelete(variable).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // res.status(200).json({ success: true, info });
    if (info) {
      res.status(200).json({ Deletesuccess: true, info });
    } else {
      const remind = new Remind(variable);

      remind.save((err, remindInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ Remindsuccess: true, remindInfo });
      });
    }
  });
});

module.exports = router;
