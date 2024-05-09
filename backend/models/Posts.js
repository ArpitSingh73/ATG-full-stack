const mongoose = require("mongoose");

const Post = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: { type: String, require: true },
  likes: { type: Number },
  comments: [ {type: String} ],
});

const PostModel = mongoose.model("PostModel", Post);
module.exports = PostModel;
