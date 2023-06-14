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
const bodyParser = require('body-parser');
const jwtSecret = "hyceefrwefewfswadcasddhuwgduwhduw";
const User = require("./Schema/signup");
const Questions = require("./Schema/questions");

mongoose.connect("mongodb+srv://hishan:1234@cluster0.sksy2nt.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("mongodb-connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json("Invalid token");
      } else {
        res.json(decodedToken);
        console.log("profile-connected");
      }
    });
  } else {
    res.status(401).json("No token");
    console.log("profile-NOT-connected");
  }
});

app.post("/register", async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(Password, bcryptSalt);
    const createdUser = await User.create({
      username: Username,
      password: hashedPassword,
    });
    jwt.sign(
      { userId: createdUser._id, Username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          console.log(err);
          res.status(500).json("Error signing token");
        } else {
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .status(201)
            .json({ id: createdUser._id });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json("Error creating user");
  }
});

app.post("/login", async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const foundUser = await User.findOne({ username: Username });
    if (foundUser) {
      const passOk = bcrypt.compareSync(Password, foundUser.password);
      if (passOk) {
        jwt.sign(
          { userId: foundUser._id, Username },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json("Error signing token");
            } else {
              res
                .cookie("token", token, { sameSite: "none", secure: true })
                .json({ id: foundUser._id });
              console.log("Login successful");
            }
          }
        );
      } else {
        res.status(401).json("Invalid credentials");
      }
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred during login");
  }
});

app.get("/questions", async (req, res) => {
  try {
    const questions = await Questions.find();
    res.json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

app.post('/logout', (req,res) => {
  res.clearCookie("token");
res.status(200).json("Logged out successfully");

});


app.get('/questions/:id', async (req, res) => {
  const { id } = req.params;
  const question = await Questions.findById(id);
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }
  res.json(question);
});


app.post('/questions/:id/check', async(req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  console.log(answer)
  const question = await Questions.findById(id);
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }
  const correctAnswer =question.output[0];
  console.log(correctAnswer)
  
  if (answer === correctAnswer) {
    res.json('correct');
  } else {
    res.json('wrong');
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});