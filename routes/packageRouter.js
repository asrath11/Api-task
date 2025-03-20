const express = require('express');

const router = express.Router();
const packageController = require('../controllers/admin/packageController');
const upload = require('../utilities/multer');
const { protect, restrictTo } = require('../middlewares/authmiddlewares');

router.use(protect); // ensures that user is logged in
router.use(restrictTo(2)); // ensures that only user_type = 2 can access resources
router.route('/').get(packageController.getPackages);

router.post(
  '/test-upload',
  upload('public/img/packages', 'packages'),
  packageController.createPackage
);

router
  .route('/:id')
  .get(packageController.getPackage)
  .delete(packageController.deletePackage);
module.exports = router;
