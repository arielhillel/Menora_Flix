const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoutes = require("./api/routes/user");
const moviesRoutes = require("./api/routes/movies");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const cookieParser = require("cookie-parser");

mongoose.connect(
  `mongodb+srv://${config.get("env.MONGO_USERNAME")}:${config.get(
    "env.MONGO_PASSWORD"
  )}@cluster0.0s1mj.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on(`connected`, () => {
  console.log("MongoDB Connected!");
});
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use(cors());

//routes
app.use("/", userRoutes);
app.use("/movies", moviesRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = app;
