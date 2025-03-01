const express = require('express');
const cityController = require('../controllers/cityController');
const router = express.Router();

router.get('/', cityController.getCities);
router.get('/:id', cityController.getCity);
router.post('/', cityController.createCity);
router.delete('/:id', cityController.deleteCity);
module.exports = router;
