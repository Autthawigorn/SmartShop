const express = require("express");
const models = require("./models");
const app = express();

// JSON middleware (parsing application/json)
app.use(express.json());

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  //create a new user
  const newUser = models.User.create({
    username: username,
    password: password,
  })

  res.status(201).json({ message: "User registered successfully", user: newUser });
});

// start the server
app.listen(8080, () => {
  console.log("Server is running.");
});
