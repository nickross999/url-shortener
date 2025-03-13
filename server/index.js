const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const db = require("./db/queries");
const { hash } = require("./hashingFunction");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

app.get("/", (req, res) => {
  res.status(200).sendFile("index.html");
});

app.get("/:linkId", (req, res) => {
  db.getOldLink(req.params.linkId).then((value) => {
    console.log(value);
    if (value) {
      return res.redirect(value);
    }
    return res.send(req.params.linkId);
  });
});

app.post("/", (req, res) => {
  if (!isValidURL(req.body.url)) {
    return res.send({
      valid: false,
      message: "Invalid URL!",
    });
  }
  db.queryOldLinks(req.body.url).then((result) => {
    if (result.linkExists) {
      console.log("Link not in database!");
      const shortLink = hash();
      db.insertNewLink(req.body.url, shortLink);
      return res.send({
        valid: true,
        message: `http://localhost:8080/${shortLink}`,
      });
    } else {
      console.log("Link in database!");
      return res.send({
        valid: true,
        message: `http://localhost:8080/${result.newLink}`,
      });
    }
  });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
