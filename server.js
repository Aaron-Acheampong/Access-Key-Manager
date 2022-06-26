const login = require('./controllers/Login');
const signUp = require('./controllers/SignUp');
const forgotPassword = require('./controllers/ForgotPassword');
const resetPassword = require('./controllers/ResetPassword');
const searchKey = require('./controllers/SearchKey');
const revokeKey = require('./controllers/RevokeKey');
const allKeys = require('./controllers/AllKeys');
const purchaseKey = require('./controllers/PurchaseKey');


require('dotenv').config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require('express');
const app = express();

const nodemailer = require("nodemailer");
const cors = require("cors");
const path= require('path');
const fs  = require('fs');
const db = require('./models/dbConnection');
const session = require("express-session");

//const stripe = require('stripe')(stripeSecretKey);
//const uuidAPIKey = require('uuid-apikey');

const port = process.env.PORT || 8080;
const store = new session.MemoryStore();

app.use(
  session({
    secret: "D53gxl41G",
    // Add the cookie property below:
    cookie: { maxAge: 172800000, secure: true, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store
  })
);

function ensureAuthentication(req, res, next) {
  console.log(req.session.authenticated);
  // Complete the if statmenet below:
  if (req.session.authenticated) {
    return next();
  } else {
    res.redirect('/');
  }
}

//app.use(  cors({  origin: "*" }) );
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  next();
});

//app.use('/allKeys', ensureAuthentication);
//app.use('/searchKey', ensureAuthentication);
//app.use('/purchaseKeys', ensureAuthentication);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});


// Login
app.post('/login', login);


// Sign UP
app.post('/signUp', signUp);


//forgot Password
app.post('/forgotPassword', forgotPassword);



  //resetPassword
  app.post('/resetPassword', resetPassword);


  //search Key
  app.get('/searchKey', searchKey);


  //purchase Key
  app.post('/purchaseKey', purchaseKey);



  //Get All keys
app.get('/allkeys', allKeys);



// revoke key
  app.post('/revokeKey', revokeKey);





const setup = async () => {
  await db.run('UPDATE KEYS SET keyStatus = "active" WHERE expiry_Date > purchase_Date AND keyStatus IS NOT "revoked"');
  //console.log(uuidAPIKey.create('asaacheampong'));

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });
};

setup();


 

