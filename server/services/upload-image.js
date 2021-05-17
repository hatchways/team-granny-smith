const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//Secret keys should not be pushed to Git
//Set your environment variables to the appropriate keys
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_DEFAULT_REGION //alternatively we can just put 'ca-central-1' since this information isn't as sensitive
});

const s3 = new aws.S3();

//checks if file is png or jpeg
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}
 
const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'team-granny-smith-s3/product-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, "img-" + Date.now().toString())
    }
  })
})

module.exports = upload;