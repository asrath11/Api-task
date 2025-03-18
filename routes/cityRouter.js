const express = require('express');
const router = express.Router();

const cityController = require('../controllers/cityController');
const { restrictTo } = require('../middlewares/authmiddlewares');

router.use(restrictTo(2));

router.route('/').get(cityController.getCities).post(cityController.createCity);
router
  .route('/:id')
  .get(cityController.getCity)
  .delete(cityController.deleteCity);
module.exports = router;
