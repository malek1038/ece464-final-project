from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"
    uid = Column(Integer, primary_key = True)
    uname = Column(String)
    passw = Column(String)
    email = Column(String)
    admin = Column(Boolean)

class Events(Base):
    __tablename__ = "users"

class Reservations(Base):
    __tablename__ = "users"
