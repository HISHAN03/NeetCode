const express = require("express");
const router = express.Router();
const question = require("../Schema/questions");
const sign = require("../Schema/signup");


router.post("/", async (req, res) => {
    try {
    const { uname, psw } = req.body;
    const user = await sign.findOne({ uname, psw });
    if (user)  try {
      const questions = await question.find();
      res.render('home', { questions });
      } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
      } else {
      res.status(401).send("Invalid username or password");
    }} 
    catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
    }
    });

    module.exports = router;
