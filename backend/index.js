const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const UserModel = require("./models/Users");
const PostModel = require("./models/Posts");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

const connectToDb = require("./db");
connectToDb();
app.use(cors());
const secret = process.env.SECRET;

app.post("/signup", async (req, res) => {
  let success = false;
  let userExists = false;
  try {
    let user;
    user = await UserModel.findOne({ email: req.body.email });

    // checking if user already exists or not ? -------------------->
    if (user) {
      userExists = true;
      return res.status(500).json({ userExists });
    }

    // if user does not exists then
    //  Hash the password
    // create new user model
    // save to database
    // create auth token and
    // send the response -------------------------->

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });

    const token = jwt.sign(user.id, secret);
    success = true;
    return res.status(201).json({ success, token: token, user });
  } catch (error) {
    return res.status(500).json({ success, userExists });
  }
});

// route for logging users in -------------------->
app.post("/login", async (req, res) => {
  let success = false;
  let userExists = false;
  try {
    const { email } = req.body;

    // check for if user exists or not ----------->
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).json({ success, userExists });
    }

    // if user does not exists then
    // match the password
    // create auth token and
    // send the response -------------------------->

    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) {
      return res.status(400).json({ success, error: "Incorrect password" });
    }

    const token = jwt.sign(user.id, secret);
    success = true;
    userExists = true;
    return res.status(201).json({ success, userExists, token: token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, userExists });
  }
});

app.get("/myPosts", async (req, res) => {
  try {
    const email = req.headers.email;
    const _id = req.headers._id;
    const myPosts = await PostModel.find({ user: _id });
    console.log(myPosts);
    res.status(201).json({ success: true, myPosts });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

app.get("/allPost", async (req, res) => {
  const allPosts = await PostModel.find({});
  console.log(allPosts);

  return res.status(201).json({ success: true, allPosts });
});

app.post("/post", async (req, res) => {
  const { post, email, _id } = req.body;
  console.log(req.body);
  let user;
  try {
    const postNew = await PostModel.create({
      user: _id,
      post: post,
    });
    await postNew.save();
    console.log(postNew);

    return res.status(201).json({ success: true, postNew });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, user });
  }
});

app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, finalPost } = req.body;
  try {
    const post = await PostModel.findOne({ _id });
    post.post = finalPost;
    await post.save();
    console.log(post);

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
});

app.delete("/delete", async (req, res) => {
  const _id = req.body;
  console.log(req.body);
  try {
    const post = await PostModel.findByIdAndDelete(_id);
    console.log(post);
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
});

app.put("/comment", async (req, res) => {
  console.log(req.body);
  const { comment, commentPostId } = req.body;
  const post = await PostModel.find({_id : commentPostId });
  console.log(typeof post.comments)
  post.comments.push(comment); 
  await post.save();

  res.status(201).json({ success: true, length:post.comments.length });
  //
});

app.put("/like", async (req, res) => {
  //
 
  const _id = req.body;
  console.log(req.body);
  try {
    const post = await PostModel.findOne({ _id });
    post.likes = post.likes ? post.likes + 1 : 1;
    await post.save();
    console.log(post);
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({  success: false });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`app has started at ${process.env.PORT}`);
});
