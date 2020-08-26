const express = require("express");

//express app

const app = express();

//register view engine

app.set("view engine", "ejs");

//listen for requests

app.listen(3000);

//Home page
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "My Classic Blog", blogs });
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
