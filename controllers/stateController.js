const State = require('../models/stateModel');
const City = require('../models/cityModel');

// Get all states
exports.getStates = async (_req, res) => {
  try {
    const states = await State.find();

    if (states.length === 0) {
      return res.status(200).json({
        status: 'Success',
        message: 'At the moment, there are no states.',
      });
    }

    return res.status(200).json({
      status: 'Success',
      results: states.length,
      states,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

// Get a single state by ID
exports.getState = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide a valid state ID.',
      });
    }

    const state = await State.findById(id);

    if (!state) {
      return res.status(404).json({
        status: 'Failed',
        message: 'State not found.',
      });
    }

    return res.status(200).json({
      status: 'Success',
      state,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};
exports.getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    if (!stateId) {
      return res.status(400).json({
        message: 'Please provide StateId',
      });
    }
    const city = await City.find({ stateId });
    if (!city) {
      return res.status(404).json({
        status: 'Failed',
        message: 'City not found',
      });
    }
    return res.status(200).json({
      status: 'Success',
      result: city.length,
      city,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

// Create a new state
exports.createState = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide the name of the state.',
      });
    }

    const state = await State.create({ name });

    return res.status(201).json({
      status: 'Success',
      state,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

// Delete a state by ID
exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide a valid state ID.',
      });
    }

    const state = await State.findByIdAndDelete(id);

    if (!state) {
      return res.status(404).json({
        status: 'Failed',
        message: 'State not found.',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'State deleted successfully.',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};
