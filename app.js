const express = require(`express`);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

// ROUTER REQUIRES
const welcomeRouter = require("./routes/welcome");
const postsRouter = require("./routes/posts");

const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use((request, response, next) => {
        const username = request.cookies.username;
        response.locals.username = '';
        if (username) {
        response.locals.username = username;
        console.log(`💩 User's username is username`);
        }
        next();
});
app.use('/', welcomeRouter);
app.use("/posts", postsRouter);

const PORT = 4545;
const DOMAIN = 'localhost';
app.listen(PORT, DOMAIN, () => {
        console.log(`🤖 Server listening on http://localhost:4545`);
});