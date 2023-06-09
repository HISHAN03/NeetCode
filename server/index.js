// const express = require("express");
// const app = express();
// const port = 3000;
// const path = require("path");
// const bodyParser = require('body-parser');
// const singupRpoter =require("./routes/signup")
// const homeRouter =require("./routes/home")
// const loginRouter =require("./routes/login")
// const adminRouter =require("./routes/admin")
// const questionRouter =require("./routes/add-questions")
// const solveRouter =require("./routes/solve")
// const submitRouter =require("./routes/submit")

//Mongoose
// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://hishan:1234@cluster0.sksy2nt.mongodb.net/?retryWrites=true&w=majority").then(() => {console.log("connected to database");});

//Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
//app.get("/", (req, res) => { res.render("index");});
app.use("/signup",singupRpoter)
app.use("/home",homeRouter)
app.use("/login",loginRouter)
app.use("/admin",adminRouter)
app.use("/add-question",questionRouter)
app.use("/add-question",questionRouter)
app.use("/solve",solveRouter)
app.use("/submit-solution",submitRouter)

//client















//listen
app.listen(port, function () { 
  console.log(`site running on port ${port}`);
  });
