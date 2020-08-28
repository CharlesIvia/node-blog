const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

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
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//About page
app.get("/about", (req, res) => {
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//BLOG ROUTES
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Post request

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

//Create blog

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

//Single blog
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

//Delete

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err) => console.log(err));
});

//404 page

app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
