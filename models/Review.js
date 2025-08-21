const { Schema, default: mongoose } = require('mongoose');
const { ErrorCodes } = require('../constants');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    rating: {
      type: Schema.Types.Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [500, ErrorCodes.TOO_LONG],
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ rating: +1 });

const Review = mongoose.model('Review', reviewSchema);

module.exports = { reviewSchema, Review };
