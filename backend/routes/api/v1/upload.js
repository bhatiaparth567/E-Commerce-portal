const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const IMAGE_PATH = path.join("/uploads");
const protect = require("../../../middleware/authMiddleware");

function checkType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  return cb("Images only");
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../..", IMAGE_PATH));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`${IMAGE_PATH}/${req.file.filename}`);
});

module.exports = router;
