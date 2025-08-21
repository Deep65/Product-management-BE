const passport = require('passport');
const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const { checkIsLoggedIn } = require('../middlewares');
const { ErrorCodes, StatusMessages } = require('../constants');

router.post(
  '/login',
  checkIsLoggedIn,
  passport.authenticate('local'),
  (req, resp) => {
    if (req.isAuthenticated()) {
      return resp.status(StatusCodes.OK).send(StatusMessages.LOGIN_SUCCESSFUL);
    }
    resp.status(StatusCodes.UNAUTHORIZED).json({
      error: ErrorCodes.INVALID_CREDENTIALS,
    });
  },
);

router.get('/logout', (req, resp) => {
  req.logout(() => {
    resp.status(StatusCodes.OK).send(StatusMessages.LOGOUT_SUCCESSFUL);
  });
});

module.exports = router;
