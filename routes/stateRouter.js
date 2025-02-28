const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
router.get('/', stateController.getStates);
router.get('/:id', stateController.getState);
router.delete('/:id', stateController.deleteState);
router.post('/', stateController.createState);
module.exports = router;
