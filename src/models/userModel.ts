const { Schema, mongoose } = require("mongoose");

const user_model = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: "",
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("users", user_model);

export { user };
