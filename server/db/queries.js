const pool = require("./pool");

async function getOldLink(newLink) {
    const result = await pool.query('SELECT * FROM links WHERE newlink=$1', [newLink]);
    if (result.rows.length > 0) {
        return result.rows[0].oldlink;
    } else {
        return null;
    }
}

async function insertNewLink(oldLink, newLink) {
    await pool.query('INSERT INTO links (oldlink, newlink) VALUES($1, $2)', [oldLink, newLink]);
}


async function queryOldLinks(linkToFind) {
    const result = await pool.query('SELECT * FROM links WHERE oldlink=$1', [linkToFind]);
    return ({
        linkExists: result.rows.length === 0,
        newLink: result.rows[0] ? result.rows[0].newlink : null
    });
}

module.exports = {
    getOldLink,
    insertNewLink,
    queryOldLinks
};