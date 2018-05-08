const express = require("express");
const fs = require("fs");
const router = express.Router();

// This tells our app to respond to a GET request only
// if the path is "/hello_world". When request is made to
// that location by a client (i.e. browser), the callback
// at argument 2 is called.

// Inside the callback, we write code that builds the response.
router.get("/hello_world", (request, response) => {
  // The "request" argument is an object that represents
  // the request being made by a client to the server. It
  // contains all the information needed to respond back.

  // The "response" argument is also an object that represents
  // the server's reply to the client. We use it to end a response
  // and send back data to the client.
  response.send("Hello, Thing!");
});

router.get("/", (request, response) => {
  // Read cookies coming from the client with the
  // "request.cookies" property. Cookies are parsed
  // into an object.
  console.log(request.cookies);
  // `response.render` is used to render the contents of a
  // template file located in the "views" directory.
  // As a first argument, pass the path to the file
  // beginning the "/views" directory without the file
  // extension.
  response.render("index");
});

// The two following routes match on the same path
// but use two different http verbs (methods).
// - GET corresponds to reads. We use to show information
//   to a client.
// - POST corresponds to writes. We use it create things
//   for a client such as cookies, new rows a db, files, etc.
router.get("/sign_in", (request, response) => {
  response.render("sign_in");
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post("/sign_in", (request, response) => {
  // When a format submits its data with a POST, its data
  // will not be available in the "request.query". Instead,
  // you all have use Express' "express.urlencoded()" middleware
  // which will parse the form data into "request.body".
  console.log(request.body);

  // Use "response.cookie()" method which was added by
  // the "cookie-parser" middleware to create a cookie.
  // The first arg. is the name of the cookie, the second
  // is the value for the cookie and the last (optional)
  // is object configuring the cookie.
  response.cookie("username", request.body.username, {
    maxAge: COOKIE_MAX_AGE
  });

  response.redirect("/");
});

router.post("/sign_out", (request, response) => {
  response.clearCookie("username");
  response.redirect("/");
});

// When this file is required with the "require()" function,
// that function will return the value on the right-hand side
// "module.exports =" (or, the value that is assigned to "module.exports")
module.exports = router;