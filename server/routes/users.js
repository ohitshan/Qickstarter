const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Payment } = require("../models/Payment");
const { auth } = require("../middleware/auth");
const multer = require("multer");

//=========================
//          User
//=========================

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).single("file");

router.get("/getUserInfoById", (req, res) => {
  console.log(req.query);
  let userIds = req.query.id;

  User.find({ _id: { $in: userIds } }).exec((err, user) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(user);
  });
});

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ filesave: false, err });
    }
    return res.json({
      filesave: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});
//

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "no user",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "wrong password",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// router.post("/changePassword", (req, res) => {
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (!user) {
//       return res.json({
//         loginSuccess: false,
//         message: "no user",
//       });
//     }
//     user.comparePassword(req.body.CurrentPassword, (err, isMatch) => {
//       if (!isMatch)
//         return res.json({
//           loginSuccess: false,
//           message: "wrong password",
//         });
//     });
//     console.log(user._doc);
//     User.updateOne(
//       { email: req.body.email },
//       {
//         password: req.body.password,
//       },
//       (err, userInfo) => {
//         if (err) return res.json({ success: false, err });
//         return res.status(200).json({
//           success: true,
//           userInfo,
//         });
//       }
//     );
//   });
// });

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    introduction: req.user.introduction,
    favorites: req.user.favorites,
    summary: req.user.summary,
    history: req.user.history,
    score: req.user.score,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
    biography: req.user.biography,
    privacy: req.user.privacy,
    location: req.user.location,
    vanityURL: req.user.vanityURL,
    websitesList: req.user.websitesList,
    addressList: req.user.addressList,
    notification: req.user.notification,
  });
});

router.get("/logout", auth, (req, res) => {
  console.log("logout", req.user);
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.post("/editProfile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      name: req.body.name,
      image: req.body.image,
      biography: req.body.biography,
      privacy: req.body.privacy,
      location: req.body.location,
      vanityURL: req.body.vanityURL,
      websitesList: req.body.websitesList,
    },
    { new: true },
    (err, user) => {
      if (err) return res.json({ edit: false, err });
      return res.status(200).json({
        edit: true,
        user,
      });
    }
  );
});

router.post("/editAddressList", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        addressList: {
          id: req.body.id,
          country: req.body.country,
          addressNickname: req.body.addressNickname,
          fullName: req.body.fullName,
          addressMain: req.body.addressMain,
          addressSub: req.body.addressSub,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode,
          phoneNumber: req.body.phoneNumber,
        },
      },
    },
    { new: true },
    (err, user) => {
      if (err) return res.json({ edit: false, err });
      return res.status(200).json({
        edit: true,
        user,
      });
    }
  );
});

router.post("/deleteAddress", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        addressList: {
          id: req.body.id,
        },
      },
    },
    { new: true },
    (err, user) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, user });
    }
  );
});

router.post("/pledgeSummary", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      summary: {
        id: req.body.projectId,
        main: req.body.main,
        add: req.body.add,
        bonus: req.body.bonus,
        total: req.body.total,
        date: Date.now(),
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, userInfo });
    }
  );
});

router.post("/onSuccessBacking", auth, (req, res) => {
  let transactionData = {};

  transactionData.user = {
    id: req.user._id,
    eamil: req.user.eamil,
  };
  transactionData.data = req.body.paymentData;
  transactionData.rewards = {
    backingdate: Date.now(),
    backingdata: req.body.backingSummary,
    paymentId: req.body.paymentData.paymentID,
  };

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        history: {
          backingdate: Date.now(),
          backingdata: req.body.backingSummary,
          paymentId: req.body.paymentData.paymentID,
        },
      },
      $set: { summary: [] },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
      });
      res.status(200).json({ success: true, userInfo });
    }
  );
});

router.post("/addToFavorites", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    if (err) return res.status(400).send(err);
    // res.status(200).json({success:true, userInfo})

    let alreadyHavefavorites = false;

    userInfo.favorites.forEach((product) => {
      if (product.id === req.body.postId) {
        alreadyHavefavorites = true;
      }
    });

    if (alreadyHavefavorites) {
      User.findOneAndUpdate(
        { _id: req.user._id, "favorites.id": req.body.postId },
        {
          $pull: {
            favorites: {
              id: req.body.postId,
            },
          },
        },
        // { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, userInfo });
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            favorites: {
              id: req.body.postId,
              // quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, userInfo });
        }
      );
    }
  });
});

router.post("/getFavorites", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, userInfo });
  });
});

router.post("/updateNotification", auth, (req, res) => {
  console.log(req.body.notification);
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      notification: req.body.notification,
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, userInfo });
    }
  );
});

router.post("/addPaymentMethods", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        paymentMethods: {
          cardNumber: req.body.cardNumber,
          cardholderName: req.body.cardholderName,
          expiration: req.body.expiration,
          cvc: req.body.cvc,
          zipCode: req.body.zipCode,
        },
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, userInfo });
    }
  );
});

router.post("/score", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        score: { id: req.body.game },
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
    }
  );
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        score: { id: req.body.game, score: req.body.score },
      },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, userInfo });
    }
  );
});

module.exports = router;
