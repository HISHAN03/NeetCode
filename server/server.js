const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcryptSalt = bcrypt.genSaltSync(10);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser')
const jwtSecret = "hyceefrwefewfswadcasddhuwgduwhduw";
const User = require("./Schema/signup");
mongoose.connect("mongodb+srv://hishan:1234@cluster0.sksy2nt.mongodb.net/?retryWrites=true&w=majority").then(() => {console.log("mongodb-connected");});
const corsOptions = { origin: ["http://localhost:5173"],credentials: true,optionSuccessStatus: 200,allowedHeaders: ["Content-Type"],};



app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));


app.post("/register", async (req, res) => {

  const {Username,Password} = req.body;
try {
    const hashedPassword = bcrypt.hashSync(Password, bcryptSalt);
    const createdUser = await User.create({
      username: Username,
      password: hashedPassword,
    });
    jwt.sign( {userId: createdUser._id, Username } , jwtSecret , {} ,
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({
            id: createdUser._id,
          });});}

 catch (err) {
    if (err) throw err;
    res.status(500).json("error");
    console.log(err);
    }});





app.post("/login", async (req, res) => {

  const { Username, Password } = req.body;
  const foundUser = await User.findOne({ username:Username });
  if (!foundUser) {
    return res.status(404).json({ error: "User not found" });
  }
  const passOk = bcrypt.compareSync(Password, foundUser.password);
  if (!passOk) {
    return res.status(401).json({ error: "Incorrect password" });
} jwt.sign( { userId: foundUser._id, Username }, jwtSecret, {},
    (err, token) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res
        .cookie("token", token, { sameSite: "none", secure: true })
        .json({ id: foundUser._id });
        console.log("Login successful");
       });});


app.listen(port, function () {
  console.log(`site running on port ${port}`);
});
