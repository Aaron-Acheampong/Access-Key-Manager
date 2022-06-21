const db = require('../models/dbConnection');
const nodemailer = require("nodemailer");

async function revokeKey(req, res) {
    const { id, email } = req.body;
    console.log(id);

    const query = `UPDATE KEYS SET keyStatus = "revoked" WHERE keyId = "${id}"`;

    await db.run(query, (err) => {
      if (err) return console.log(err.message);
      console.log('key is revoked');
      res.json({id: id});
  })

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'melba.ratke71@ethereal.email', // generated ethereal user
      pass: 'ywaAmKPVBjAmbfHCEx', // generated ethereal password
    },
  });

  const msg = {
    from: '"Access key manager" <info@fileserver.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Key Revoked", // Subject line
    text: `Your key with ID ${id} is revoked`, // plain text body
    attachments: null
  };
  // send mail 
  await transporter.sendMail(msg, async (err, info) => {
    if (err) console.error(err.message);
  });
}


module.exports = revokeKey;