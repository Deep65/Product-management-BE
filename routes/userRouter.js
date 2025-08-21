const router = require('express').Router();
const { createUser, getUser, updateUser } = require('../controllers/user');

const { checkAuthenticated } = require('../middlewares');

router.post('/', createUser);

router.use(checkAuthenticated);

router.get('/:userId', getUser);
router.patch('/:userId', updateUser);

module.exports = router;
