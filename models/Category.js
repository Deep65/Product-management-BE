const { Schema, default: mongoose } = require('mongoose');
const { ErrorCodes } = require('../constants');

const categorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [50, ErrorCodes.TOO_LONG],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('category', categorySchema);

module.exports = {
  categorySchema,
  Category,
};
