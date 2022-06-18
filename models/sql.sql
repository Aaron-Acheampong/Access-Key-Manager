--CREATE TABLE USERS (userId	INTEGER NOT NULL, email	TEXT NOT NULL, 
--password	TEXT NOT NULL, "userRole" TEXT, PRIMARY KEY(userId AUTOINCREMENT));

/*CREATE TABLE KEYS (keyId	INTEGER NOT NULL, keyValue	TEXT NOT NULL, 
purchase_Date	DATETIME NOT NULL, expiry_Date	DATETIME NOT NULL, 
purchasedBy	INTEGER NOT NULL, keyStatus TEXT  ,
 FOREIGN KEY(purchasedBy) REFERENCES USERS(userId),PRIMARY KEY(keyId AUTOINCREMENT));*/

--INSERT INTO USERS (email, password, userRole)
--VALUES ("aronzy.as@gmail.com", "mypassword", "admin");

--INSERT INTO KEYS (keyValue, purchase_Date, expiry_Date, purchasedBy)
--VALUES ("asaacheampong", CURRENT_TIMESTAMP, '2022-10-5 12:30:00', 1);

--SELECT * FROM USERS;
SELECT * FROM KEYS;

--SELECT 	purchase_Date, expiry_Date FROM KEYS;

--DROP TABLE KEYS;