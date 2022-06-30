--CREATE TABLE USERS (userId	INTEGER NOT NULL, email	TEXT NOT NULL, 
--password	TEXT NOT NULL, "userRole" TEXT, PRIMARY KEY(userId AUTOINCREMENT));

/*CREATE TABLE KEYS (keyId	INTEGER NOT NULL, keyValue	TEXT NOT NULL, 
purchase_Date	DATETIME NOT NULL, expiry_Date	DATETIME NOT NULL, 
purchasedBy	INTEGER NOT NULL, keyStatus TEXT  ,
 FOREIGN KEY(purchasedBy) REFERENCES USERS(email),PRIMARY KEY(keyId AUTOINCREMENT));*/

--INSERT INTO USERS (email, password, userRole)
--VALUES ("aronzy.as@gmail.com", "mypassword", "admin");

--INSERT INTO KEYS (keyValue, purchase_Date, expiry_Date, purchasedBy)
--VALUES ("gsfjggughhvjkdhvgh", CURRENT_TIMESTAMP, '2022-05-5 12:30:00', 'aronzy.as@gmail.com');

--SELECT * FROM USERS;
--SELECT * FROM KEYS;
--SELECT * FROM KEYS WHERE purchasedBy = "aaron.acheampong@amalitech.org" AND keyStatus = "active"
--SELECT * FROM KEYS WHERE purchasedBy = "aronzy.as@gmail.com" AND keyStatus = "active"
--SELECT 	purchase_Date, expiry_Date FROM KEYS;

--DROP TABLE KEYS;


--UPDATE KEYS 
--SET keyStatus = (CASE WHEN expiry_Date > purchase_Date THEN keyStatus = "active" ELSE keyStatus = "expired" END) 
--WHERE keyStatus IS NOT "revoked"