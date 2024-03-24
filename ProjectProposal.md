## Group: Placeholder name

### Darren Chau (darren.chau@cooper.edu), Alexander Cheung (alexander.cheung@cooper.edu), Malek Haddad (malek.haddad@cooper.edu)

# Introduction

Our project is a database involving event sign up for users. The program will simulate an event sign up program, in which users can reserve spots in events occuring at certain times and dates. There will be tables for users, tables for events with details, and tables for reservations for each event. Queries will allow users to view event details, filter out certain events, and sign up for a spot in events. The users for this are people who wish to sign up for events, and those who wish to organize such events.

The program would have two views, depending on if the user wishes to sign up or organize an event. A user who wishes to sign up will be able to register an account and then view events. They would be able to filter out events and organize the list of events depending on data such as date and type of event, and then register themselves for these events, as well as view events they have signed up for. An organizer is able to view available event spaces, see what events are already scheduled, and schedule their own event, choosing time, location, and type of event.

Our databse will include data about the users, such as a uid and name. It will include data about events, such as their location, their time and date, their capacity, and the type of event. Data about reservations will include the user that made the reservation and the event that is being reserved including details about that event. Event spaces will list events taking place within them.

# ER Diagrams

# Schema

**User Schema:** 
Users(uid: integer, uname: string, password: string, email: string)

**Event Schema:** 
Events(eid: integer, ename: string, organizer: string, type: string, location: string, capacity: integer, date: string)

**Reservation Schema:**
Reservations(uid: integer, eid: integer)

# Table SQL commands



