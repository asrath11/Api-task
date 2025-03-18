const express = require('express');
const router = express.Router();
const stateController = require('../controllers/admin/stateController');
const { protect, restrictTo } = require('../middlewares/authmiddlewares');

router.use(protect); // ensures that user is logged in
router.use(restrictTo(2)); // ensures that only user_type = 2 can access resources
router
  .route('/')
  .get(stateController.getStates)
  .post(stateController.createState);

router
  .route('/:id')
  .get(stateController.getState)
  .delete(stateController.deleteState);

router.get('/:stateId/cities', stateController.getCitiesByState);
module.exports = router;
