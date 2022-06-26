const db = require('../models/dbConnection');

async function login(req, res) {
    const {email, password} = req.body;

    console.log(email, password);

    const query = `SELECT * FROM USERS WHERE email = "${email}" AND password = "${password}" `;

    await db.all(query, (err, rows) => {
      if(err) return console.error(err.message);

      req.session.authenticated = true;
      // Add the user object below:
      req.session.user= {
        email,
        password,
      };

      console.log(rows);
      console.log(req.session);
      res.json(rows);

  });
}


module.exports = login;