/*
Some sample queries we might implement
*/

--Want to have five event types: Food, Workshop, Conference, Performance, Speaker
--Queries to get events of each type
SELECT Events.ename, Events.organizer, Events.location, Events.capacity, Events.time, Events.date
FROM Events
WHERE Events.type = 'Food'
  
SELECT Events.ename, Events.organizer, Events.location, Events.capacity, Events.time, Events.date
FROM Events
WHERE Events.type = 'Workshop'
  
SELECT Events.ename, Events.organizer, Events.location, Events.capacity, Events.time, Events.date
FROM Events
WHERE Events.type = 'Conference'

SELECT Events.ename, Events.organizer, Events.location, Events.capacity, Events.time, Events.date
FROM Events
WHERE Events.type = 'Performance' 

SELECT Events.ename, Events.organizer, Events.location, Events.capacity, Events.time, Events.date
FROM Events
WHERE Events.type = 'Speaker'

