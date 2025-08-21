const { Schema, default: mongoose } = require('mongoose');
const { ErrorCodes } = require('../constants');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [100, ErrorCodes.TOO_LONG],
      trim: true,
    },
    description: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [500, ErrorCodes.TOO_LONG],
    },
    price: {
      type: Schema.Types.Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    image: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ name: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = { productSchema, Product };
