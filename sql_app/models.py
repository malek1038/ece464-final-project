from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"

class Events(Base):
    __tablename__ = "users"

class Reservations(Base):
    __tablename__ = "users"
