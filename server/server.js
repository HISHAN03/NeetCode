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
const jwtSecret = process.env.jwtSecret;
const User = require("./Schema/signup");
const methodOverride = require('method-override');
const Questions = require("./Schema/questions");
app.use(methodOverride('_method'));
mongoose.connect(process.env.MONGO_URL)
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
      }
  catch (error) 
     {
    console.error("Failed to fetch questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
    }});


app.post('/logout', (req,res) => 
  {
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'hishan' && password === '1234') {
    // Successful login
    res.json({ success: true, message: 'Login successful' });
  } else {
    // Invalid credentials
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});
app.post('/add-question', async (req, res) => {
  try {
    const { title, description, output } = req.body;

    // Create a new question instance
    const newQuestion = new Questions({
      title,
      description,
      output
    });

    // Save the question to the database
    await newQuestion.save();

    res.status(200).json({ message: 'Question added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the question' });
  }
});



app.get('/delete-question/:id', async (req, res) => {
  try {
    const { id } = req.params;
   await Questions.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/edit-question/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, output } = req.body;

    // Find the question by ID
    const question = await Questions.findById(id);

    if (!question) {
      // If the question is not found, return a 404 status
      return res.sendStatus(404);
    }

    // Update the question fields
    question.title = title;
    question.description = description;
    question.output = output;

    // Save the updated question
    const updatedQuestion = await question.save();

    // Return the updated question as the response
    res.json(updatedQuestion);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});









app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});