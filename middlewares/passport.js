const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { StatusMessages, ErrorCodes } = require('../constants');

const checkAuthenticated = (req, resp, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  resp.status(StatusCodes.UNAUTHORIZED).json({
    error: ReasonPhrases.UNAUTHORIZED,
  });
};

const checkIsLoggedIn = (req, resp, next) => {
  if (req.isAuthenticated()) {
    return resp.status(StatusCodes.OK).json({
      error: StatusMessages.USER_ALREADY_LOGGED_IN,
    });
  }
  next();
};

const isAdminOrVendor = ([role]) => (req, resp, next) => {
  const { user } = req;
  if (user?.roles === 'Admin' || user?.roles === 'Vendor') {
    return next();
  }
  return resp.status(StatusCodes.FORBIDDEN).json({
    error: ErrorCodes.INSUFFICIENT_RIGHTS,
  });
};

const isCustomer = () => (req, resp, next) => {
  const { user } = req;
  if (user?.roles === 'Customer') {
    return next();
  }
  return resp.status(StatusCodes.FORBIDDEN).json({
    error: ErrorCodes.INSUFFICIENT_RIGHTS,
  });
};

module.exports = {
  checkAuthenticated,
  checkIsLoggedIn,
  isAdminOrVendor,
  isCustomer,
};
