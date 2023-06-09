const express = require("express");
const router = express.Router();

router.post("/submit-solution", (req, res) => {
  const input = req.body.input;
  try {
    if (input.trim() === question1.output) {
      res.send("Success");
    } else {
      res.send("Failure");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
