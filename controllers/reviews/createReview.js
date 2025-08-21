const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  OrderModel: { Order },
  ReviewModel: { Review },
} = require('../../models');

const createReview = async (req, res) => {
  const { productId, orderId, rating, comment } = req.body;
  const userId = req.user._id;
  try {
    const existingOrder = await Order.findOne({
      userId,
      productId,
      _id: orderId,
    });

    if (!existingOrder) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Order not found with the current user and product' });
    }

    const review = new Review({
      userId,
      productId,
      orderId,
      rating,
      comment,
    });

    const createdReview = await review.save();
    res.status(StatusCodes.CREATED).json(createdReview);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = createReview;
