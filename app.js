const express = require("express");
const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const passport = require("passport");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/posts", postsRouter);
app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
