/*
SQL queries to create tables for events
*/
CREATE TABLE Users(
  uid int PRIMARY KEY,
  uname VARCHAR(30),
  passw VARCHAR(30),
  email VARCHAR(30),
  admin BOOLEAN
);

CREATE TABLE Events(
  eid INT PRIMARY KEY,
  ename VARCHAR(50),
  organizer VARCHAR(50),
  type VARCHAR(30),
  location VARCHAR(100),
  capacity INT,
  date VARCHAR(30)
);

CREATE TABLE Reservations(
  uid INT,
  eid INT,
  FOREIGN KEY(uid) REFERENCES Users(uid),
  FOREIGN KEY(eid) REFERENCES Events(eid),
  PRIMARY KEY(uid, eid)
);
