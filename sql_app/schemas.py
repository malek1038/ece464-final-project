#Revise with actual values to be passed
from pydantic import BaseModel

class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    uid: int
    uname: str
    admin: bool

    class Config:
        orm_mode = True
