const db = require('../models/dbConnection');
const nodemailer = require("nodemailer");
const uuidAPIKey = require('uuid-apikey');

require('dotenv').config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;



const stripe = require('stripe')(stripeSecretKey);


async function purchaseKey(req, res) {
    const { stripeTokenId, expiry_Date, email } = req.body;
    const id = stripeTokenId + expiry_Date;
    const keyValue = uuidAPIKey.create(id);
    

    stripe.charges.create({
        amount: 0,
        source: stripeTokenId,
        currency: 'usd'
    }).then(function() {
        console.log('Charge Successfull');
        res.json({message: 'Successfully purchased Key'})
    }).catch(function*() {
        console.log('Charge Fail!');
        res.status(500).end();
    });

    const query = `INSERT INTO KEYS (keyValue, purchase_Date, expiry_Date, purchasedBy) VALUES (?, ?, ?, ?)`;

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    await db.run( query, [ keyValue.apiKey, dateTime, expiry_Date, email],
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
        subject: "Access Key Purchase: Here is your generated key", // Subject line
        text: `Dear ${email}, Here is your key details ${keyValue} and it expires on ${expiry_Date}`, // plain text body
        attachments: null
      };
      // send mail 
      await transporter.sendMail(msg, async (err, info) => {
        if (err) console.error(err.message);
      });

}


module.exports = purchaseKey;