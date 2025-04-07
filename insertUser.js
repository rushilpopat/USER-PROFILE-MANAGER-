const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const User = require("./model/userschema");
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err);
    });
});

app.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);
  User.create(user)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
