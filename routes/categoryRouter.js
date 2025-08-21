const router = require('express').Router();
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');
const { checkAuthenticated, isAdminOrVendor } = require('../middlewares');

router.use(checkAuthenticated);
router.post('/', isAdminOrVendor(['admin']), createCategory);

router.get('/:categoryId', getCategory);
router.patch('/:categoryId', isAdminOrVendor(), updateCategory);
router.delete('/:categoryId', isAdminOrVendor(), deleteCategory);

module.exports = router;
