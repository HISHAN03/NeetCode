const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
    res.render("admin");
    });
router.post("/", (req, res) => {
    res.render("add-question");
    });
 
    module.exports = router;
