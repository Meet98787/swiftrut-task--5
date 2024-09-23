const multer = require('multer');
const path = require('path');

// Set up storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Upload folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});

// File filter for validating image types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
};

// Initialize Multer with storage and file filter options
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Max 5MB
  fileFilter
});

module.exports = upload;
