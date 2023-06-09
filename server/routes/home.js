const express = require("express");
const router = express.Router();
const question = require("../Schema/questions");
router.get('/', async (req, res) => {
    try {
    const questions = await question.find();
    res.render('home', { questions });
    } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
    }
    });

    module.exports = router;
