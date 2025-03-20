const multer = require('multer');

const multerConfig = (fieldName, singleFile = true) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/img/${fieldName}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      const user = req.user._id;
      const date = Date.now();
      cb(null, `${fieldName}-${user}-${date}.${ext}`);
    },
  });

  const filter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: filter,
    // limits: {
    //   fileSize: 10 * 1024 * 1024,
    //   fieldSize: 50 * 1024 * 1024,
    // },
  });
  if (singleFile) {
    return upload.single('image');
  }
  return upload.fields([
    {
      name: 'imageCover',
      maxCount: 1,
    },
    {
      name: 'images',
      maxCount: 2,
    },
  ]);
};

module.exports = multerConfig;
