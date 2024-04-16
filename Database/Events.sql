
CREATE TABLE Events(
  eid INT PRIMARY KEY,
  ename VARCHAR(50),
  organizer VARCHAR(50),
  type VARCHAR(30),
  location VARCHAR(100),
  capacity INT,
  reservations INT,
  time VARCHAR(30),
  date VARCHAR(30)
);
