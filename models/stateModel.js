const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StateSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the state'],
  },
});
const state = mongoose.model('State', StateSchema);
module.exports = state;
