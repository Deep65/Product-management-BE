const LocalStrategy = require('passport-local').Strategy;
const {
  UserModel: { User },
} = require('../models');

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ userName: username }).exec();
    if (!user) {
      return done(null, false);
    }
    if (!user.verifyPassword(password)) {
      return done(null, false);
    }
    done(null, user.stripped());
  } catch (err) {
    done(err);
  }
});

module.exports = localStrategy;
