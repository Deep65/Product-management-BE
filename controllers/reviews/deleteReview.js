const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  ReviewModel: { Review },
} = require('../../models');

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;
  try {
    const review = await Review.findOne({ _id: reviewId, userId });

    if (!review) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Review not found' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = deleteReview;
