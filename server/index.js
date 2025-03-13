const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

const referenceTable = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

app.get("/", (req, res) => {
  console.log(req);
  return res.send("Hello from the server!");
});

app.get("/:linkId", (req, res) => {
  if (db[req.params.linkId]) {
    console.log(db[req.params.linkId]);
    return res.redirect(db[req.params.linkId]);
  }
  return res.send(req.params.linkId);
});

app.post("/", (req, res) => {
  const uuid = uuidv4();
  var numericID = 1;
  for (let i = 0; i < uuid.length; i++) {
    let ch = uuid[i];
    let val = ch.charCodeAt(0);
    if (val >= 48 && val <= 57) {
      numericID += val - 48;
    } else if (val >= 65 && val <= 90) {
      numericID += val - 65 + 11;
    } else if (val >= 97 && val <= 122) {
      numericID += val - 97 + 73;
    }
  }
  const salt = Math.ceil(Math.random() * 100) * 23 * 7;
  numericID = numericID * salt;

  var genHashVal = "";
  let dummyId = numericID;

  while (dummyId > 0) {
    const rem = dummyId % 62;
    genHashVal += referenceTable[rem];
    dummyId = Math.floor(dummyId / 62);
  }
  db[genHashVal] = req.body.url;
  console.log(db);
  return res.send(`http://localhost:8080/` + genHashVal);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
