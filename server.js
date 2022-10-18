const express = require("express");
const mongoose = require("mongoose");
const Blogs = require("./model");
const app = express();

const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://roop_sagar:apple0420@cluster0.klycv5u.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected");
  });
app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/addblog", async (req, res) => {
  try {
    const { title, body, author, category } = req.body;
    let exist = await Blogs.findOne({ title });
    if (exist) {
      return res.send("Title already exist");
    }

    let newBlog = new Blogs({
      title,
      body,
      author,
      category,
    });
    await newBlog.save();
    res.send("Added Successfully...");
  } catch (error) {
    console.log(error);
    return res.send("Internal server error");
  }
});
app.get("/", async (req, res) => {
  try {
    let data = await Blogs.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.get("/:id", async (req, res) => {
  try {
    let data = await Blogs.findById(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.put("/editblog/:id", async (req, res) => {
  try {
    const { title, body, author, category } = req.body;
    const newBlog = {
      title: title,
      author: author,
      body: body,
      category: category,
    };
    // let exist = await Blogs.findOne({title});
    // if(exist){
    //     return res.send('Title already exist');
    // }
    Blogs.findByIdAndUpdate(req.params.id, newBlog).then();
    res.send("Updated Successfully...");

    // let newBlog = new Blogs({
    //     id:req.body.id,
    //     title,body,author,category
    // });
    // await newBlog.updateOne();
    // res.send('updated')
  } catch (error) {
    console.log(error);
  }
});
app.delete("/deleteblog/:id", async (req, res) => {
  try {
    await Blogs.findByIdAndDelete(req.params.id);
    return res.send("Deleted");
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("server running...");
});
