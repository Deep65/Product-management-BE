const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Schema.Types.Number,
    },
    totalAmount: {
      type: Schema.Types.Number,
    },
    status: {
      type: Schema.Types.String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ status: 'text' });
orderSchema.index({ totalAmount: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = { orderSchema, Order };
