const express = require("express");
const app = express();
const port = 5000;

const cookieParser = require("cookie-parser");
const config = require("./config/key");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/users"));
app.use("/api/product", require("./routes/product"));

app.listen(port, () => console.log(`Exampe app listening on port ${port}!`));
