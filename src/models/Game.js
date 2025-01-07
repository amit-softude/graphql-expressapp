const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  platform: [{
    type: String,
    enum: ['Switch', 'PS5', 'Xbox', 'PC']
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema); 