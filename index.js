const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const userRouter = require("./routes/user");
const answerRouter = require("./routes/answer");
const questionRouter = require("./routes/question");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/question", questionRouter);
app.use("/answer", answerRouter);
app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8082, () => {
      console.log("Your app is alive!");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
