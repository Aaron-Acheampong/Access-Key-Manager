const db = require('../models/dbConnection');
const nodemailer = require("nodemailer");

async function signUp(req, res) {
    const {email, password} = req.body;
    console.log( email, password);
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
   
    await db.run(
        query,
        [ email, password],
        async (err) => {
            if(err) return console.error(err.message);
            console.log("User added successfully");
            res.json("User added successfully");  
        }
    );

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
        subject: "Signup: email verification", // Subject line
        text: `Dear ${row.email}, \nPlease copy and paste the link below into your browser in order to signup\n/index.html\nThank you`, // plain text body
        attachments: null
      };
      // send mail 
      await transporter.sendMail(msg, async (err, info) => {
        if (err) console.error(err.message);
      });


}


module.exports = signUp;