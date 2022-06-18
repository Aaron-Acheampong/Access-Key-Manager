const login = require('./controllers/Login');
const signUp = require('./controllers/SignUp');
const forgotPassword = require('./controllers/ForgotPassword');
const resetPassword = require('./controllers/ResetPassword');
const searchKey = require('./controllers/SearchKey');
const revokeKey = require('./controllers/RevokeKey');
const allKeys = require('./controllers/AllKeys');


const express = require('express');
const app = express();

const nodemailer = require("nodemailer");
const cors = require("cors");
const path= require('path');
const fs  = require('fs');
const db = require('./models/dbConnection');

const port = process.env.PORT || 8080;

app.use(  cors({  origin: "*" }) );
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  next();
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/views/index.html'));
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



  //Get All keys
app.get('/allkeys', allKeys);



// revoke key
  app.post('/revokeKey', revokeKey);





const setup = async () => {
  await db.run('UPDATE KEYS SET keyStatus = "active" WHERE expiry_Date > purchase_Date');

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });
};

setup();


 

