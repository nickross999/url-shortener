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
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
      '(\\?[;&a-z\\d%_.~+=-]*)?' + 
      '(\\#[-a-z\\d_]*)?$', 
    'i'
  );
  return pattern.test(string);
}

app.get("/", (req, res) => {
  res.status(200).sendFile("index.html");
});

app.get("/:linkId", (req, res) => {
  const link = db.getOldLink(req.params.linkId);
  console.log(link);
    if (link) {
      return res.redirect(link);
    }
    return res.send(req.params.linkId);
});

app.post("/", (req, res) => {
  if (!isValidURL(req.body.url)) {
    return res.send({
      valid: false,
      message: "Invalid URL!",
    });
  }
  const queryResult = db.queryOldLinks(req.body.url);
  if (!queryResult.linkExists) {
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
      message: `http://localhost:8080/${queryResult.newLink}`,
    });
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
