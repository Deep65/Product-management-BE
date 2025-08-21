const router = require('express').Router();
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsByProduct,
  getReviewsByLoggedInUser,
  updateReview,
} = require('../controllers/reviews');
const { checkAuthenticated, isCustomer } = require('../middlewares');

router.get('/', getAllReviews);
router.get('/reviewsByProduct/:productId', getReviewsByProduct);
router.use(checkAuthenticated);
router.post('/', isCustomer(), createReview);
router.get('/getReviewsByLoggedInUser',isCustomer(), getReviewsByLoggedInUser);
router.patch('/:reviewId', isCustomer(), updateReview);
router.delete('/:reviewId', isCustomer(), deleteReview);

module.exports = router;
