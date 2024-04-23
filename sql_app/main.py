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