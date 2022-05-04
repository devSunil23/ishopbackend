import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    trim: true,
    max: 20,
    uniqueCaseInsensitive: [true, "First Letter is Capital"],
  },
  mobile: {
    type: Number,
    required: true,
    min: 10,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 10,
  },
  confirmpassword: {
    type: String,
    required: true,
    min: 4,
    max: 10,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
// password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});
// token generating
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = Jwt.sign({ _id: this._id }, process.env.SECRETKEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};
const Users = mongoose.model("user", userSchema);
export default Users;
