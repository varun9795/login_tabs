const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({path:"../.env"});
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./Routes/userRoutes");

app.use("/api/v1", user);


app.use(express.static(path.join(__dirname, "../my-react-app/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../my-react-app/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;