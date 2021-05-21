const express = require("express");
const router = express.Router();

const upload = require("../controllers/upload-image");

const uploadSingleImage = upload.single("image");

router.route("/image").post((req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [
          {
            title: "file upload error",
            detail: err.message
          }
        ]
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
