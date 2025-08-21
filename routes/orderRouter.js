const router = require('express').Router();
const {
  createOrder,
  deleteOrder,
  getOrdersByUser,
  getOrderById,
  updateOrder,
} = require('../controllers/orders');
const {
  checkAuthenticated,
  isCustomer,
  isAdminOrVendor,
} = require('../middlewares');

router.use(checkAuthenticated);

router.post('/', isCustomer(), createOrder);
router.get('/', getOrdersByUser);
router.get('/:orderId', getOrderById);
router.patch('/:orderId', isCustomer(), updateOrder);
router.delete('/:orderId', isAdminOrVendor(), deleteOrder);

module.exports = router;
