const express = require('express');
const app = express();

const nodemailer = require("nodemailer");
const cors = require("cors");
const db = require('./models/dbConnection');

const port = process.env.PORT || 8080;

app.use(  cors({  origin: "*" }) );
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));


// Login
app.post('/login', 

async (req, res) => {
    const {email, password} = req.body;

    console.log(email, password);

    const query = `SELECT * FROM users WHERE email = "${email}" AND password = "${password}" `;

    await db.all(query, (err, rows) => {
      if(err) return console.error(err.message);
          console.log(rows);
          res.json(rows);

  });

});


// Sign UP
app.post('/signUp', async (req, res) => {
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


});

//forgot Password
app.post('/forgotPassword', async (req, res) => {

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
  });



  //resetPassword
  app.post('/resetPassword', async (req, res) => {
    const {email, newPassword, confirmPassword} = req.body;
    console.log(email);

    const query = `UPDATE users SET password = "${newPassword}" WHERE email = "${email}"`;

    await db.run(query, (err) => {
        if (err) return console.err(err.message);
        console.log('Password is reset');
        res.json('Password is reset');
    })
});


  //search Key
  app.get('/searchKey', async function(req, res) {
    const {email} = req.body;
    console.log(email);
    var UserId = '';
    const query1 = `SELECT * FROM users WHERE title LIKE "%${email}%"`;
    await db.run(query1, (err, user) => {
        if(err) return console.error(err.message);
        UserId = user.userId;

      });

  
    const query2 = `SELECT * FROM keys WHERE purchasedBy LIKE "%${UserId}%"`;
   await  db.all(query2, (err, rows) => {
      if(err) return console.error(err.message);
  
      console.log(rows);
      res.json(rows);
    });
  });



  //Get All keys
app.get('/allkeys', async (req, res) => {
  const query = `SELECT keyId, userId, email, keyValue, purchase_Date, expiry_Date, keyStatus FROM users INNER JOIN keys
  ON users.userId = keys.purchasedBy;`;

  await db.all(query, (err, rows) => {
    if(err) return console.error(err.message);

    res.json(rows);

  });
});



// revoke key
  app.post('/revokeKey', async (req, res) => {
    const { keyId, email } = req.body;
    console.log(keyId);

    const query = `UPDATE keys SET password = "revoked" WHERE keyId = "${keyId}"`;

    await db.run(query, (err) => {
      if (err) return console.err(err.message);
      console.log('key is revoked');
      res.json('key revoked');
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
    text: `Your key with ID ${keyId} is revoked`, // plain text body
    attachments: null
  };
  // send mail 
  await transporter.sendMail(msg, async (err, info) => {
    if (err) console.error(err.message);
  });

})








  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });

