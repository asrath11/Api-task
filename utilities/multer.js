const multer = require('multer');

const multerConfig = (dest, name) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      const user = req.user._id;
      const date = Date.now();
      cb(null, `${name}-${user}-${date}.${ext}`);
    },
  });

  const filter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb('image only allowed', false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: filter,
  });
  return upload.single('image');
};

module.exports = multerConfig;
