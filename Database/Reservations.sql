CREATE TABLE Reservations(
  uid INT,
  eid INT,
  FOREIGN KEY(uid) REFERENCES Users(uid),
  FOREIGN KEY(eid) REFERENCES Events(eid),
  PRIMARY KEY(uid, eid)
);