const express = require("express");
const router = express.Router();
const question = require("../Schema/questions");

router.get('/', function (req, res) {
    res.render('add-question');
    });

    
router.post('/', async function (req, res) {
    const ques = await new question({
    title: req.body.title,
    description: req.body.description,
    output:req.body.output
    }); 
    ques.save();
    res.status(200).redirect("/home");
    });

    module.exports = router;
