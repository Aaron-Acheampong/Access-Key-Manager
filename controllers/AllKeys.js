const db = require('../models/dbConnection');

async function allKeys(req, res) {
    const query = `SELECT keyId, purchasedBy, keyValue, purchase_Date, expiry_Date, keyStatus FROM KEYS`;

  await db.all(query, (err, rows) => {
    if(err) return console.error(err.message);

    res.json(rows);

  });
}


module.exports = allKeys;