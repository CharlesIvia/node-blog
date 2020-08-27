const express = require("express");
const mongoose = require("mongoose");

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

//listen for requests

// app.listen(3000);

//Home page
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//About page
app.get("/about", (req, res) => {
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//Create blog

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

//404 page

app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
