const { Schema, mongoose } = require("mongoose");
import validator from "validator";
const user_model = new Schema({
  password: {
    type: String,
    required: [true, "Please provide us password!"],
    minLength: [8, "Password should have 8 characters!"],
    select: false,
  },
  username: {
    type: String,
    default: "",
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Email is required!"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide us valid email!"],
  },
});

const user = mongoose.model("users", user_model);

export { user };
