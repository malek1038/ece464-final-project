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

/*
Populate Tables
*/
insert into Users values (1,'admin','abcdefg','admin@cooper.edu',1);
insert into Users values (2,'dataman','password','organizer@cooper.edu',1);
insert into Users values (3,'eventgoer','swordfish','personal@gmail.com',0);
insert into Users values (4,'andy','password123','helpme@yahoo.com',0);
insert into Users values (5,'rusty','xyzabc','throwaway@cooper.edu',0);

insert into Events values(1, 'Ice Cream Social', 'IEEE', 'Food', 'Room 3', 50, '12/09/2024');
insert into Events values(2, 'Talent Show', 'Elementary School', 'Performance', 'Auditoriom', 100, '01/04/2024');
insert into Events values(3, 'Synergizing the Agile Method', 'Boeing', 'Conference', 'Room 2', 30, '07/24/2023');
insert into Events values(4, 'Woodworking', 'Community', 'Workshop', 'Room 56', 15, '04/19/2024');

