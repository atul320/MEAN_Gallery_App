const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

//use express static folder
app.use(cors({origin: '*'}))
app.use(express.static("./public"));

// body-parser middleware use
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.get("/view", (req, res) => {
  res.render("view");
});
app.get("/show", (req, res) => {
  // result = this.result;
 res.render('show');
});

// Database connection
const db = mysql.createConnection({
  host: "_hostport_",
  user: "_username_",
  password: "_password_",
  database: "_databaseName_",
});

db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './public/images'); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    console.log("ChLa", file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    callBack(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({
  storage: storage,
});

//! Routes start
app.post("/addImage",  upload.single('image'),(req, res) => {
    console.log("Ye bhi Chala",req.file.filename)

  let data = {
    file_src: `http://127.0.0.1:3200/images/` + req.file.filename,
    imagetime: new Date(),
    imagetag: req.body.imagetag,
    imagename: req.body.imagename,
  };
  db.query("INSERT INTO users_file SET ?", data, (err) => {
    if (err) throw err;
  });
  res.redirect('http://localhost:4200/view');
  console.log("something 2",data);
});

app.get("/images", (req, res) => {
  db.query("SELECT * FROM users_file", (err, result) => {
    if (err) throw err;
    console.log(result);
    this.resultJson = result
    res.send(Object.values(JSON.parse(JSON.stringify(result))));
  });
});

//create connection
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
