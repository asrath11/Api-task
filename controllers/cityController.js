const City = require('../models/cityModel');

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find();
    if (cities.length === 0) {
      return res.status(200).json({
        message: 'There no city at the moment',
      });
    }
    return res.status(200).json({
      status: 'Success',
      results: cities.length,
      cities,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.getCity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Please provide Id in the path',
      });
    }
    const city = await City.findById(id);
    if (!city) {
      return res.status(404).json({
        status: 'Failed',
        message: 'There is no city with that id',
      });
    }
    return res.status(200).json({
      status: 'Success',
      city,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.createCity = async (req, res) => {
  try {
    const { name, stateId } = req.body;
    if (!name) {
      return res.status(400).json({
        message: 'Please provide Name',
      });
    }
    const city = await City.create({ name, stateId });
    return res.status(202).json({
      status: 'Success',
      city,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        status: 'Failed',
        message: 'Please Provide id',
      });
    }
    const city = await City.findByIdAndDelete(id);
    return res.status(200).json({
      status: 'Success',
      message: 'successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Failed',
      message: error.message,
    });
  }
};
