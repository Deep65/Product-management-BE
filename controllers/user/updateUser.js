const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  UserModel: { User },
} = require('../../models');
const { ErrorCodes } = require('../../constants');

const updateUser = async (req, resp) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const reqUser = req.user;

    if (reqUser.roles === 'User') {
      if (reqUser._id !== userId) {
        return resp.status(StatusCodes.FORBIDDEN).json({
          error: ReasonPhrases.FORBIDDEN,
        });
      }
    }

    const user = await User.findOneAndUpdate({ _id: userId }, userData, {
      new: true,
    }).exec();

    if (!user) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_USER_ID,
      });
    }

    resp.status(StatusCodes.OK).json(user.stripped());
  } catch (err) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = updateUser;
