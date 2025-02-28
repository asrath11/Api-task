const State = require('../models/stateModel');
exports.getStates = async (req, res) => {
  try {
    const states = await State.find();
    if (!states) {
      res.status(200).json({
        message: 'At the movement,There is no State',
      });
      return res.status(200).json({
        status: 'Success',
        states,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};
