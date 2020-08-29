const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

//BLOG ROUTES
router.get("/", blogController.blog_index);

//Post request

router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

//Create blog

router.get("/create", blogController.blog_create_get);

//Single blog
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

//Delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
