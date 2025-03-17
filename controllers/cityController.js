const City = require('../models/cityModel');
const asyncHandler = require('../utilities/asyncHandler');

exports.getCities = asyncHandler(async (req, res) => {
  const cities = await City.find();
  return res.status(200).json({
    status: 'Success',
    results: cities.length,
    data: cities,
  });
});

exports.getCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    const err = new Error('Missing city ID');
    err.statusCode = 400;
    throw err;
  }

  const city = await City.findById(id);
  if (!city) {
    const err = new Error('City not found');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json({ status: 'Success', data: city });
});

exports.createCity = asyncHandler(async (req, res) => {
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
});

exports.deleteCity = asyncHandler(async (req, res) => {
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
});
