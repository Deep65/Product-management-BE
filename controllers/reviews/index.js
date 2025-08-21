const createReview = require('./createReview');
const {
  getReviewsByProduct,
  getReviewsByLoggedInUser,
  getAllReviews,
} = require('./getReviews');
const updateReview = require('./updateReview');
const deleteReview = require('./deleteReview');

module.exports = {
  createReview,
  deleteReview,
  updateReview,
  getReviewsByProduct,
  getReviewsByLoggedInUser,
  getAllReviews,
};
