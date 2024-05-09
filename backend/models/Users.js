const mongoose = require("mongoose");

const User = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
 
});

const UserModel = mongoose.model("UserModel", User);
module.exports = UserModel;
