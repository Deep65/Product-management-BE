const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { ErrorCodes } = require('../constants');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [50, ErrorCodes.TOO_LONG],
    },
    email: {
      type: Schema.Types.String,
      required: true,
      maxLength: 50,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: ErrorCodes.INVALID_EMAIL,
      },
    },
    password: {
      type: Schema.Types.String,
      required: true,
      minLength: [8, ErrorCodes.TOO_SHORT],
    },
    roles: {
      type: Schema.Types.String,
      enum: ['Customer', 'Admin', 'Vendor'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.verifyPassword = function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
};

userSchema.methods.stripped = function () {
  const user = this._doc;
  delete user.password;
  return { ...user };
};

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10); //  Hashed password
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function hashPassword(next) {
  const update = this.getUpdate();

  if (update.password) {
    const hashedPassword = await bcrypt.hash(update.password, 10);
    update.password = hashedPassword;
    next();
  }
});

userSchema.index({ userName: 'text' });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = {
  userSchema,
  User,
};
