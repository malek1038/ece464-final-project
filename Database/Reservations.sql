CREATE sequence reservationID_seq start with 100;

CREATE TABLE Reservations(
  resevationID INT DEFAULT nextval('reservationID_seq'),
  uid INT,
  eid INT,
  FOREIGN KEY(uid) REFERENCES Users(uid),
  FOREIGN KEY(eid) REFERENCES Events(eid),
  PRIMARY KEY(uid, eid)
);