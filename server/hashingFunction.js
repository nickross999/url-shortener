const { v4: uuidv4 } = require("uuid");
const referenceTable = require("./referenceTable");

function hash() {
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
  3;
  return genHashVal;
}

module.exports = {
  hash,
};
