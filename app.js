const express = require("express");
const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const cors = require("cors");
const passport = require("./middlewares/passportConfig");
const app = express();
require("dotenv").config();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

app.use("/posts", postsRouter);
app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
