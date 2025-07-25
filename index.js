const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files }); //second files is sourch & first one is destination or use for dom
  });
});

//-------Read More........
app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("./show", {
        filename: req.params.filename,
        filedata: filedata,
      });
    }
  );
});

//getting data from DOM to store in file
app.post("/create", function (req, res) {
  if (!req.body.title.trim() || !req.body.details.trim()) {
    res.redirect("/");
  } else {
    fs.writeFile(
      `./files/${req.body.title.split(" ").join("")}.txt`,
      req.body.details,
      function (err) {
        res.redirect("/");
      }
    );
  }
});

app.listen(3000, function () {
  console.log("server runing.....");
});
