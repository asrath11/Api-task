const express = require('express');
const router = express.Router();

const cityController = require('../controllers/admin/cityController');
const { protect, restrictTo } = require('../middlewares/authmiddlewares');

router.use(protect); // ensures that user is logged in
router.use(restrictTo(2)); // ensures that only user_type = 2 can access resources

router.route('/').get(cityController.getCities).post(cityController.createCity);
router
  .route('/:id')
  .get(cityController.getCity)
  .delete(cityController.deleteCity);
module.exports = router;
