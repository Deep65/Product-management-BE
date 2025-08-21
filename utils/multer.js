const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const { ErrorCodes } = require('../constants');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public'),
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

const multerInstance = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(ErrorCodes.INVALID_FILE_TYPE), false);
    }
  },
}).single('image');

function resizeImage(req, res, next) {
  if (!req.file) {
    return next();
  }

  const imagePath = path.join(__dirname, '../public', req.file.filename);
  const tempImagePath = path.join(
    __dirname,
    '../public',
    `${Date.now()}_temp${path.extname(req.file.filename)}`,
  );

  sharp(imagePath)
    .resize(800, 600)
    .toFile(tempImagePath, (err) => {
      if (err) {
        console.error('Error resizing image:', err);
        return next(err);
      }

      fs.rename(tempImagePath, imagePath, (renameError) => {
        if (renameError) {
          console.error('Error replacing the original image:', renameError);
          return next(renameError);
        }
        next();
      });
    });
}

module.exports = { multerInstance, resizeImage };
