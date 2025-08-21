const router = require('express').Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductListByAggregation,
} = require('../controllers/products');
const { getReviewsByProduct } = require('../controllers/reviews');
const { checkAuthenticated, isAdminOrVendor } = require('../middlewares');
const { multerInstance, resizeImage } = require('../utils/multer');

router.get('/', getAllProducts);
router.get('/aggregate', getProductListByAggregation);
router.use(checkAuthenticated);
router.post('/', isAdminOrVendor(), multerInstance, resizeImage, createProduct);
router.get('/:productId', getProductById);
router.get('/:productId/:reviewId', getReviewsByProduct);
router.patch(
  '/:productId',
  isAdminOrVendor(),
  multerInstance,
  resizeImage,
  updateProduct,
);
router.delete('/:productId', isAdminOrVendor(), deleteProduct);

module.exports = router;
