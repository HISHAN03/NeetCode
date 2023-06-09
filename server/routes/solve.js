const express = require("express");
const router = express.Router();
const question = require("../Schema/questions");

router.get("/:id", async (req, res) => {
  try {
    const questionId = req.params.id;
    const question1 = await question.findById(questionId); // Replace with your own function for finding a question by ID
    if (!question1) {
      return res.status(404).send("Question not found");
    }

    res.render("solve", { question1 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
