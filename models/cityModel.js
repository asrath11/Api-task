const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CitySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the city'],
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: [true, 'Please provide a state id'],
  },
});
const City = mongoose.model('City', CitySchema);
module.exports = City;
