from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User, Events, Reservations
from pydantic import BaseModel

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_by_id(db: Session, user_id: int):
    user = db.query(User).filter(User.uid == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users/{user_id}")
def read_user(user_id: str, db: Session = Depends(get_db)):
    user = get_user_by_id(db, int(user_id))
    return user

def get_user_by_username(db: Session, username: str):
    user = db.query(User).filter(User.uname == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/userByName/{username}")
def read_user(username: str, db: Session = Depends(get_db)):
    user = get_user_by_username(db, username)
    return user

class UserCreate(BaseModel):
    uname: str
    passw: str
    email: str
    admin: bool

def create_user(db: Session, user: UserCreate):
    db_user = User(uname=user.uname, passw=user.passw, email=user.email, admin=user.admin)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/createUser/")
def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    db_user = create_user(db, user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not created")
    return "User " + db_user.uname + " created successfully"

class EventCreate(BaseModel):
    ename: str
    organizer: str
    type: str
    location: str
    capacity: int
    reservations: int
    time: str
    date: str

def create_event(db: Session, event: EventCreate):
    db_event = Events(ename=event.ename, organizer=event.organizer, type=event.type, location=event.location, capacity=event.capacity, reservations=event.reservations, time=event.time, date=event.date)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.post("/createEvent/")
def create_event_route(event: EventCreate, db: Session = Depends(get_db)):
    db_event = create_event(db, event)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not created")
    return "Event " + db_event.ename + " created successfully"

def get_event_by_id(db: Session, event_id: int):
    event = db.query(Events).filter(Events.eid == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.get("/events/{event_id}")
def read_event(event_id: str, db: Session = Depends(get_db)):
    event = get_event_by_id(db, int(event_id))
    return event

def get_event_by_name(db: Session, event_name: str):
    event = db.query(Events).filter(Events.ename == event_name).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.get("/eventByName/{event_name}")
def read_event(event_name: str, db: Session = Depends(get_db)):
    event = get_event_by_name(db, event_name)
    return event

class ReservationCreate(BaseModel):
    uid: int
    eid: int

def create_reservation(db: Session, reservation: ReservationCreate):
    db_reservation = Reservations(uid=reservation.uid, eid=reservation.eid)
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return db_reservation

def UpdateEventReservations(db: Session, event_id: int, num_reservations: int):
    event = db.query(Events).filter(Events.eid == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    event.reservations = num_reservations
    db.commit()
    db.refresh(event)
    return event
    
@app.post("/createReservation/")
def create_reservation_route(reservation: ReservationCreate, db: Session = Depends(get_db)):
    if get_user_by_id(db, reservation.uid) is None:
        raise HTTPException(status_code=404, detail="User not found")
    if get_event_by_id(db, reservation.eid) is None:
        raise HTTPException(status_code=404, detail="Event not found")
    db_reservation = create_reservation(db, reservation)
    if db_reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not created")
    
    # Update the number of reservations for the event
    UpdateEventReservations(db, reservation.eid, get_event_by_id(db, reservation.eid).reservations + 1)
    return "Reservation for user " + str(db_reservation.uid) + " at event " + str(db_reservation.eid) + " created successfully"

def get_reservations_by_user(db: Session, user_id: int):
    reservations = db.query(Reservations).filter(Reservations.uid == user_id).all()
    if reservations is None:
        raise HTTPException(status_code=404, detail="Reservations not found")
    return reservations

@app.get("/reservationsByUser/{user_id}")
def read_reservations_by_user(user_id: str, db: Session = Depends(get_db)):
    reservations = get_reservations_by_user(db, int(user_id))
    return reservations

def get_reservations_by_event(db: Session, event_id: int):
    reservations = db.query(Reservations).filter(Reservations.eid == event_id).all()
    if reservations is None:
        raise HTTPException(status_code=404, detail="Reservations not found")
    return reservations

@app.get("/reservationsByEvent/{event_id}")
def read_reservations_by_event(event_id: str, db: Session = Depends(get_db)):
    reservations = get_reservations_by_event(db, int(event_id))
    return reservations