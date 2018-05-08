const express = require("express");
const router = express.Router();

const knex = require("../db");

// Posts#index URL: /posts METHOD: GET
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("posts")
    .orderBy("createAt", "DESC")
    .then(posts => {
      // res.send(posts);
      res.render("posts/index", { posts: posts });
    });
});

// Posts#new URL: /posts/new METHOD: GET
router.get("/new", (req, res) => {
  res.render("posts/new");
});

// Posts#create URL: /posts METHOD: POST
router.post("/", (req, res, next) => {
  let date = new Date()
  knex
  .insert({
    //id: createdPost.id,
    //time: "right now",
    description: req.body.description,
    pictureUrl: req.body.pictureUrl,
    username: req.cookies.username
  })
  .into("posts")
  .returning("*")
  // To execute query written with knex, you must
  // the .then method at the end.
  // When the query is completed, a callback given to
  // then will be called. Inside of its body, run any
  // that needs to run after the query is completed.
  .then(([createdPost]) => {
    res.redirect(`/posts/${createdPost.id}`);
  })
  // Sometimes a error can occur when a query. If this happens,
    // the callback given to .then will not be called. Instead,
    // the method .catch with callback to do something when
    // error occurs during the query.
    .catch(error => {
      next(error);
    });
});

// Post#show URL: /posts/:id METHOD: GET
router.get("/:id", (req, res, next) => {
  // Use "req.params" to get URL params from a request.
  // URL params only appear for using `:` to match parts
  // the url to data.
  // /posts/20 -> req.params == {id: 20}
  // /:name/:occupation -> /jon/king -> req.params == {name: "jon", occupation: "kings"}
  // res.send(req.params);

  const postId = req.params.id;

  knex
    .select("*")
    .from("posts")
    .where({ id: postId })
    .then(data => {
      const [post] = data;

      if (post) {
        res.render("posts/show", { post: post });
      } else {
        res.send("Post doesn't exist!");
      }
    });
});

module.exports = router;
