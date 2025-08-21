const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  OrderModel: { Order },
  ReviewModel: { Review },
} = require('../../models');

const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const updateData = req.body;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Review not found' });
    }

    const existingOrder = await Order.findOne({
      userId: req.user._id,
      productId: updateData.productId,
    });

    if (!existingOrder) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Order not found with the current user and product' });
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, {
      new: true,
    });

    res.status(StatusCodes.OK).json(updatedReview);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = updateReview;
