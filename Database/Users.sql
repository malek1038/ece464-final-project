CREATE SEQUENCE user_seq start with 100;

CREATE TABLE Users(
  uid bigint NOT NULL DEFAULT nextval('user_seq') PRIMARY KEY,
  uname VARCHAR(30),
  passw VARCHAR(30),
  email VARCHAR(30),
  admin BOOLEAN
);