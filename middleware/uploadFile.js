const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "docs/");
  },
  filename(req, file, cb) {
    const filename = Date.now().toString() + "-" + file.originalname;
    req.body.file = filename;
    cb(null, filename);
  },
});

const types = ["application/pdf"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.errorFile = "invalid file type";
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
