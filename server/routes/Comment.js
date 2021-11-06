const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             comment
//=================================

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("user")
      .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getComment", (req, res) => {
  let prdocutId = req.body.prdocutId;

  Comment.find({ prdocutId: prdocutId })
    .populate("user")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, comments });
    });
});

router.post("/deleteComment", (req, res) => {
  let myComment = req.body.myComment;

  // console.log("myComment", myComment);

  Comment.findOneAndDelete({
    user: myComment.user._id,
    prdocutId: myComment.prdocutId,
  })
    .populate("user")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
});

module.exports = router;
