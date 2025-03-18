const express = require('express');
const router = express.Router();

const cityController = require('../controllers/admin/cityController');
const { protect, restrictTo } = require('../middlewares/authmiddlewares');

router.use(protect);
router.use(restrictTo(2));

router.route('/').get(cityController.getCities).post(cityController.createCity);
router
  .route('/:id')
  .get(cityController.getCity)
  .delete(cityController.deleteCity);
module.exports = router;
