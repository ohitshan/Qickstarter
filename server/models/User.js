const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minlength: 6,
    },
    lastname: {
      type: String,
      maxlength: 50,
    },
    biography: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
      default: [],
    },
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
    introduction: {
      type: String,
      maxlength: 100,
    },
    favorites: {
      type: Array,
      default: [],
    },
    history: {
      type: Array,
      default: [],
    },
    score: {
      type: Array,
      default: [
        { id: "wordrelay", score: 0 },
        { id: "minesweeper", score: 0 },
        { id: "tictactoe", score: 0 },
      ],
    },
    summary: {
      type: Array,
      default: [],
    },
    privacy: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    vanityURL: {
      type: String,
    },
    websitesList: {
      type: Array,
      default: [],
    },
    addressList: {
      type: Array,
      default: [],
    },
    notification: {
      type: Object,
      default: {
        comment: { mail: true, phone: true },
        message: { mail: true, phone: true },
        project: { mail: true, phone: true },
        newProject: { mail: true, phone: true },
        following: { mail: true, phone: true },
        followedYou: { mail: true, phone: true },
        tip: { mail: true, phone: true },
        announcement: { mail: true, phone: true },
        research: { mail: true, phone: true },
      },
    },
    paymentMethods: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// userSchema.pre("updateOne", function (next) {
//   let user = this._update;
//   console.log("12", user);
//   if (user.isModified("password")) {
//     bcrypt.genSalt(saltRounds, function (err, salt) {
//       console.log(user);
//       if (err) return next(err);
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     console.log("fail");
//     next();
//   }
// });

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;

  let token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
