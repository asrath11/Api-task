const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addOnSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please Provide name'],
    unique: true,
  },
  category: {
    type: String,
    enum: [
      'Decorations',
      'Cakes - Egg Less Cakes',
      'photograpy',
      'Roses',
      'Special Effects',
    ],
  },
  displayType: {
    type: String,
    enum: ['AddOns', 'Gifts'],
  },
  price: {
    type: Number,
  },
  image: String,
});

const AddOns = mongoose.model('AddOns', addOnSchema);
module.exports = AddOns;
