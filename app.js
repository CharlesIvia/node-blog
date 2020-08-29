const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const homeRoute = require("./routes/homeRoute");
const aboutRoute = require("./routes/aboutRoute");
const notFoundRoute = require("./routes/notFoundRoute");
//express app

const app = express();

//Connect to Mongo Db

const dbURL =
  "mongodb+srv://gatsby:gatsby2020@cluster0.holkp.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
//register view engine

app.set("view engine", "ejs");

//Middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//Mongoose sandbox and routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Rosebud🌹",
    snippet: "TWhat was Citizen Kane's Rosebud",
    body: "Announced. Today Charles Foster Kaned died in solitude in Xanadu...",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("5f4804527c9fae42d0970260")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Home page
app.use(homeRoute);

//About page
app.use(aboutRoute);

//Blog routes

app.use("/blogs", blogRoutes);

//404 page

app.use(notFoundRoute);
