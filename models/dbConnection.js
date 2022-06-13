const sqlite3 = require('sqlite3').verbose(); 

const db = new sqlite3.Database("./accessKeys.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);

    console.log("Database connection successful");
})
 //Create users table
 db.run('CREATE TABLE users ("userId"	INTEGER NOT NULL, "email"	TEXT,"password"	TEXT,PRIMARY KEY("userId" AUTOINCREMENT))');

 //Create Keys table
 db.run('CREATE TABLE "keys" ("keyId"	INTEGER NOT NULL,"keyValue"	TEXT,"purchase_Date"	TEXT,"expiry_Date"	TEXT,"purchasedBy"	INTEGER,FOREIGN KEY("purchasedBy") REFERENCES "users"("userId"),PRIMARY KEY("keyId" AUTOINCREMENT))');

 //Create emails table
 //db.run('CREATE TABLE "emails" ("emailId"	INTEGER NOT NULL,"emailFile"	INTEGER,PRIMARY KEY("emailId" AUTOINCREMENT),FOREIGN KEY("emailFile") REFERENCES "files"("fileId"))');

 //Create downloads table
 //db.run('CREATE TABLE "downloads" ("downloadId"	INTEGER NOT NULL,"downloadFile"	INTEGER,PRIMARY KEY("downloadId" AUTOINCREMENT),FOREIGN KEY("downloadFile") REFERENCES "files"("fileId"));');
 //const sql = 'SELECT * FROM users';

 //Delete user
 //db.run('DELETE FROM files WHERE fileId = 3');


 //db.all(sql, [], (err, rows) => {
    // if(err) return console.error(err.message);
    
    // rows.forEach((row) => {
    //     console.log(row);
   //  })
// } )

 db.close((err) => {
     if (err) return console.error(err.message);
 })




module.exports = db;