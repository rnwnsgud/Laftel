const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

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
    inventory: req.user.inventory,
    recommend: req.user.recommend,
    stars: req.user.stars,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_authExp", user.tokenExp);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/addToInventory", auth, (req, res) => {
  //user Collection에 해당 유저 정보 가져오기
  // console.log("req.body", req.body);
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // console.log("userInfo", userInfo);
    let duplicate = false; //보고싶다 버튼 클릭시 있으면 지워주고 없으면 추가
    userInfo.inventory.forEach((item) => {
      //카트가 없어서 오류 뜬거구나
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { inventory: { id: req.body.productId } },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.inventory);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            inventory: {
              id: req.body.productId,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.inventory);
        }
      );
    }
  });
});

router.post("/addToRecommend", auth, (req, res) => {
  //user Collection에 해당 유저 정보 가져오기
  // console.log("req.body", req.body);
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // console.log("userInfo", userInfo);
    let duplicate = false; //보고싶다 버튼 클릭시 있으면 지워주고 없으면 추가
    userInfo.recommend.forEach((item) => {
      //카트가 없어서 오류 뜬거구나
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { recommend: { id: req.body.productId } },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.recommend);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            recommend: {
              id: req.body.productId,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.recommend);
        }
      );
    }
  });
});

router.post("/addToStar", auth, (req, res) => {
  //user Collection에 해당 유저 정보 가져오기
  // console.log("req.body", req.body);
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // console.log("userInfo", userInfo);
    let duplicate = false; //보고싶다 버튼 클릭시 있으면 지워주고 없으면 추가
    userInfo.stars.forEach((item) => {
      //카트가 없어서 오류 뜬거구나
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $set: { stars: { id: req.body.productId, stars: req.body.stars } },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.stars);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            stars: {
              id: req.body.productId,
              stars: req.body.stars,
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.stars);
        }
      );
    }
  });
});

module.exports = router;
