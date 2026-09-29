const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, 'Le numéro de catway est requis'],
      unique: true
    },
    type: {
      type: String,
      required: [true, 'Le type est requis'],
      enum: ['long', 'short']
    },
    catwayState: {
      type: String,
      required: [true, "L'état du catway est requis"],
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Catway', catwaySchema);