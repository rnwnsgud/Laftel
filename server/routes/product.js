const express = require("express");
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { Product } = require("../models/Product");
const { Video } = require("../models/Video");

//=================================
//             Product
//=================================
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");
router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

var storage_video = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "video/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== "mp4") {
      return cb(res.status(400).end("mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var video = multer({ storage: storage_video }).single("file");

router.post("/video", (req, res) => {
  video(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let filePath = "";
  let fileDuration = "";

  //비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    // ffmpeg.setFfmpegPath("C:\ffmpeg-4.4-essentials_build\bin\ffmpeg.exe");
    console.dir(metadata);
    // console.log("req.body", req.body);
    // console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  //썸네일 생성
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("will generate" + filenames.join(", "));
      console.log(filenames);

      filePath = "video/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 1,
      folder: "video/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
});

router.post("/", (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }
  let sortStandard = {};

  if (req.body.title) {
    sortStandard = { title: 1 };
  } else if (req.body.trend) {
    sortStandard = { title: -1 };
  }

  //console.log("findArgs", findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .skip(skip)
      .limit(limit)
      .sort(sortStandard)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    Product.find(findArgs)
      .skip(skip)
      .limit(limit)
      .sort(sortStandard)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  Product.find({ _id: { $in: productIds } }).exec((err, product) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, product });
  });
});

router.get("/getVideo", (req, res) => {
  let productId = req.query.id;
  Video.find({ productId: productId }).exec((err, video) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send({ success: true, video });
  });
});

module.exports = router;
