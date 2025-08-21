const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  ReviewModel: { Review },
} = require('../../models');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'userName')
      .populate('productId');

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const getReviewsByLoggedInUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const reviews = await Review.find({ userId }).populate('productId');

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId })
      .populate('userId', 'userName')
      .populate('productId');

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { getAllReviews, getReviewsByLoggedInUser, getReviewsByProduct };
