const db = require('../models/dbConnection');

async function searchKey(req, res) {
    const {email} = req.body;
    console.log(email);
    /*let UserId = '';
    const query1 = `SELECT * FROM users WHERE title LIKE "%${email}%"`;
    await db.run(query1, (err, user) => {
        if(err) return console.error(err.message);
        UserId = user.userId;

      });*/
      

  
    const query = `SELECT * FROM keys WHERE purchasedBy LIKE "%${email}%"`;
   await  db.all(query, (err, rows) => {
      if(err) return console.error(err.message);
  
      console.log(rows);
      res.json(rows);
    });
}


module.exports = searchKey;