let db = [];

function getOldLink(newLink) {
  let result = null;
  for (let i = 0; i < db.length; i++) {
    if (db[i].newLink === newLink) {
      result = db[i].oldLink;
      break;
    }
  }
  if (result) {
    return result;
  } else {
    return null;
  }
}

function insertNewLink(oldLink, newLink) {
  db.push({
    newLink: newLink,
    oldLink: oldLink,
  });
  console.log(db);
}

function queryOldLinks(linkToFind) {
  let result = null;
  let exists = false;
  for (let i = 0; i < db.length; i++) {
    if (db[i].oldLink === linkToFind) {
      result = db[i].newLink;
      exists = true;
      break;
    }
  }
  return {
    linkExists: exists,
    newLink: exists ? result : null,
  };
}

module.exports = {
  getOldLink,
  insertNewLink,
  queryOldLinks,
};
