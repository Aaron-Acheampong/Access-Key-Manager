const db = require('../models/dbConnection');

async function allKeys(req, res) {
    const query = `SELECT keyId, userId, email, keyValue, purchase_Date, expiry_Date, keyStatus FROM users INNER JOIN keys
  ON users.userId = keys.purchasedBy;`;

  await db.all(query, (err, rows) => {
    if(err) return console.error(err.message);

    res.json(rows);

  });
}


module.exports = allKeys;