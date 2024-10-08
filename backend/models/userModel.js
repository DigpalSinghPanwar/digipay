const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
  },
  {
    toJSON: true,
    toObject: true,
  }
);


userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password, "hash success");
    next();
  } catch (error) {
    console.log(error, "hash unsuccess");
    next();
  }
});

userSchema.methods.correctPassword = async function (
  currentPassword,
  userPassword
) {
  console.log(currentPassword, userPassword);
  return await bcrypt.compare(currentPassword, userPassword);
};  

const User = mongoose.model("User", userSchema);

module.exports = User;
