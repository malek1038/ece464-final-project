from pydantic import BaseModel

class ReservationBase(BaseModel):
    title: str
    description: str | None = None

class ReservationCreate(ReservationBase):
    pass

class Reservations(ReservationBase):
    uid: int
    eid: int

    class Config:
        orm_mode = True
