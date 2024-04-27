#Not sure how to implement relationships for our thing

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    __tablename__ = "user"
    uid = Column(Integer, primary_key = True)
    uname = Column(String)
    passw = Column(String)
    email = Column(String)
    admin = Column(Boolean)

    userReservation = relationship("Reservations", back_populates="reserveUser")

class Events(Base):
    __tablename__ = "events"
    eid = Column(Integer, primary_key = True)
    ename = Column(String)
    organizer = Column(String)
    type = Column(String)
    location = Column(String)
    capacity = Column(Integer)
    reservations = Column(Integer)
    time = Column(String)
    date = Column(String)
    tags = Column(String, nullable=True)

    eventReservation = relationship("Reservations", back_populates="reserveEvent")

class Reservations(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True)  # new primary key column
    uid = Column(Integer, ForeignKey("user.uid"))
    eid = Column(Integer, ForeignKey("events.eid"))

    reserveUser = relationship("User", back_populates="userReservation")
    reserveEvent = relationship("Events", back_populates="eventReservation")


    
