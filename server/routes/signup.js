const express = require("express");
const router = express.Router();
const sign = require("../Schema/signup");

router.get("/", (req, res) => {
    res.render("signup");
    });
router.post("/", async (req, res) =>{
    const signn = await new sign({
    uname: req.body.uname,
    psw: req.body.psw,
    });
    signn.save();
    res.status(200).send("done");
    });


    module.exports = router;
