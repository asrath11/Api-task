const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const { restrictTo } = require('../middlewares/authmiddlewares');

router.use(restrictTo('Admin'));
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
