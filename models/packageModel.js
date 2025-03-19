const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide package name'],
    unique: true,
  },
  priceDescription: {
    type: String,
    required: [true, 'please provide price Description'],
  },
  capacityDescription: {
    type: String,
    required: [true, 'please provide capacity Description'],
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'Please provide a city id'],
  },
  area: {
    type: String,
    required: [true, 'please provide area'],
  },
  price: {
    type: Number,
    required: [true, 'please provide price'],
  },
  extraPersonCost: {
    type: Number,
    required: [true, 'Please provide extra Person Cost'],
  },
  defaultCapacity: {
    type: Number,
    default: 0,
  },
  maxCapacity: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});

const package = mongoose.model('Package', packageSchema);

module.exports = package;
