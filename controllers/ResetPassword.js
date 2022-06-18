const db = require('../models/dbConnection');

async function resetPassword(req, res) {
    const {email, newPassword, confirmPassword} = req.body;
    console.log(email);

    const query = `UPDATE USERS SET password = "${newPassword}" WHERE email = "${email}"`;

    await db.run(query, (err) => {
        if (err) return console.err(err.message);
        console.log('Password is reset');
        res.json('Password is reset');
    })
}


module.exports = resetPassword;