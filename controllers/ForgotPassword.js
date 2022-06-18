const db = require('../models/dbConnection');
const nodemailer = require("nodemailer");

async function forgotPassword(req, res) {
    const {email} = req.body;
    console.log(email);
  
    const query = `SELECT * FROM users WHERE email = "${email}"`;
  
    await db.all(query, async (err, rows) => {
      if(err) return console.error(err.message);
      console.log(rows.length);
      if (rows.length === 0){
          res.json("Invalid user");
          console.log("Invalid User");
      }else{
                        
          rows.forEach(async row => {
            console.log(row.username);
          
  
          let transporter = nodemailer.createTransport({
            // https://ethereal.email/
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'melba.ratke71@ethereal.email', // generated ethereal user
              pass: 'ywaAmKPVBjAmbfHCEx', // generated ethereal password
            },
          });
        
          const msg = {
            from: '"The Access Key Manager" <info@accesskeymanager.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Reset Password", // Subject line
            text: `Dear ${row.email}, \nPlease copy and paste the link below into your browser in order to rest your password\n/resetpassword.html?email=${email}\nThank you`, // plain text body
            
          };
          // send mail with defined transport object
          let info = await transporter.sendMail(msg);
        
          // console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
          console.log('Email Sent');
          res.json('Email sent');
        
        });
      }
    });
}


module.exports = forgotPassword;