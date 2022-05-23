const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const { Subscriber } = require("../models/Subscriber");

//=========================
//          Product
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

router.post("/uploadpost", (req, res) => {
  const post = new Post(req.body);

  post.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/getPosts", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Post.find()
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, postNumber: posts.length, posts });
    });
});

router.post("/getLastDayPosts", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Post.find()
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, postNumber: posts.length, posts });
    });
});

router.post("/myPosts", (req, res) => {
  Post.find({ writer: { $in: req.body.id } })
    .populate("writer")
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, posts });
    });
});
//처음에한

router.post("/getBackedPost", (req, res) => {
  console.log("1", req.body.id);
  Post.find({ _id: { $in: req.body.id } })
    .populate("writer")
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, posts });
    });
});
// router.post('/myPosts', (req, res) => {
//   User.find({ email: req.body.email })
//     .exec((err, userEmail) => {
//       if (err) return res.status(400).send(err);
//       // return res.status(200).json({ success: true, userEmail });

//       let User = userEmail

//       Product.find({ writer: { $in: User } })
//         .populate('writer')
//         .exec((err, posts) => {
//           if (err) return res.status(400).send(err);
//           res.status(200).json({ success: true, posts })
//         })

//     });
// })

router.get("/post_by_id", (req, res) => {
  let type = req.query.type;
  let postIds = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    postIds = ids.map((item) => {
      return item;
    });
  }

  Post.find({ _id: { $in: postIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

router.get("/user_by_id", (req, res) => {
  let userIds = req.query.id;

  Post.find({ writer: { $in: userIds } })
    .populate("writer")
    .exec((err, user) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(user);
    });
});

router.get("/searchEngine", (req, res) => {
  console.log(req.query);
  let titleTerm = req.query.title;
  Post.find({
    "title.title": new RegExp(titleTerm),
  })
    .populate("writer")
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      let final = posts;
      if (req.query.sub) {
        final = posts.filter(
          (post) => post.category.PrimarySubcategory === req.query.sub
        );
        if (req.query.location) {
          final = final.filter((post) => post.location === req.query.location);
        }
      } else if (req.query.main) {
        final = posts.filter(
          (post) => post.category.PrimaryCategory === req.query.main
        );
        if (req.query.location) {
          final = final.filter((post) => post.location === req.query.location);
        }
      } else if (req.query.location) {
        final = posts.filter((post) => post.location === req.query.location);
      }

      return res.status(200).json({ success: true, final });
    });
});

router.get("/searchByCategory", (req, res) => {
  let titleTerm = req.query.main;
  Post.find({
    "category.PrimaryCategory": titleTerm,
  })
    .populate("writer")
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, posts });
    });
});

router.get("/searchBySubCategory", (req, res) => {
  let subCategory = req.query.sub;
  Post.find({
    "category.PrimarySubcategory": subCategory,
  })
    .populate("writer")
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, posts });
    });
});

router.post("/deletePost", (req, res) => {
  Post.findOneAndDelete({ _id: req.body._id }).exec((err, post) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, post });
  });
});

router.post("/editpost", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id },
    {
      title: req.body.title,
      images: req.body.images,
      description: req.body.description,
    },
    (err, post) => {
      if (err) return res.json({ edit: false, err });
      return res.status(200).json({
        edit: true,
        post,
      });
    }
  );
});

router.post("/askQuestions", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $push: {
        faq: {
          id: Date.now(),
          content: req.body.content,
          from: req.body.from,
        },
      },
    },
    { new: true },
    (err, postInfo) => {
      if (err) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, postInfo });
    }
  );
});
router.post("/answerQuestions", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $push: {
        answerfaq: {
          id: Date.now(),
          content: req.body.content,
          answertitle: req.body.answertitle,
        },
      },
    },
    { new: true }
  )
    .populate("writer")
    .exec((err, postInfo) => {
      if (err) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, postInfo });
    });
});
// router.post("/answerQuestions", (req, res) => {
//   Post.findOneAndUpdate(
//     { _id: req.body.postId },
//     {
//       $push: {
//         answerfaq: {
//           id: Date.now(),
//           content: req.body.content,
//           answertitle: req.body.answertitle,
//         },
//       },
//     },
//     { new: true },
//     (err, postInfo) => {
//       if (err) return res.status(400).json({ success: false });
//       res.status(200).json({ success: true, postInfo });
//     }
//   );
// });

router.post("/updates", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $push: {
        updates: {
          id: Date.now(),
          title: req.body.title,
          description: req.body.descrip,
        },
      },
    },
    { new: true },
    (err, postInfo) => {
      if (err) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, postInfo });
    }
  );
});

router.post("/deleteUpdate", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $pull: { updates: { id: req.body.updateId } },
    },

    { new: true },
    (err, postInfo) => {
      if (err) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, postInfo });
    }
  );
});

router.post("/getSubscription", (req, res) => {
  Subscriber.find({ userFrom: req.body.userFrom }).exec(
    (err, subscribeInfo) => {
      if (err) return res.status(400).send(err);
      // res.status(200).json({ success: true, subscribeInfo })

      let subscriptionList = [];
      subscribeInfo.map((subscription, i) => {
        subscriptionList.push(subscription.userTo);
      });

      Post.find({ writer: { $in: subscriptionList } })
        .populate("writer")
        .exec((err, products) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, products });
        });
    }
  );
});

module.exports = router;
