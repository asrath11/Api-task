const express = require('express');
const router = express.Router();

const addOnsController = require('../controllers/admin/addOnsController');
const { protect } = require('../middlewares/authmiddlewares');
const upload = require('../utilities/multer');

router.use(protect);
router.route('/').post(upload('addOns', true), addOnsController.createAddOns);

module.exports = router;
