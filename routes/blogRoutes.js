const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

//BLOG ROUTES
router.get("/", blogController.blog_index);

//Post request

router.post("/", blogController.blog_create_post);

//Create blog

router.get("/create", blogController.blog_create_get);

//Single blog
router.get("/:id", blogController.blog_details);

//Delete

router.delete("/:id", blogController.blog_delete);

module.exports = router;
