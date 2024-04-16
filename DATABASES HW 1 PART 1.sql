/*
Darren Chau
ECE464 Assignment 1 Part 1

	1:List, for every boat, the number of times it has been reserved, excluding those boats that have never been reserved (list the id and the name).
	*/
SELECT reserves.bid, COUNT(reserves.bid), boats.bname
FROM reserves, boats
where boats.bid = reserves.bid
GROUP BY reserves.bid, boats.bname
HAVING COUNT(reserves.bid) > 0

/* 2:List those sailors who have reserved every red boat (list the id and the name). */
/*Find all red boats, then check sailors who have reserved all of these boats*/
SELECT sailors.sid, sailors.sname	--Select sailor ids and names
FROM sailors
where NOT EXISTS(
	(SELECT boats.bid	--Select boats that are red
		FROM boats
		where boats.color = 'red')
	EXCEPT
	(SELECT boats.bid
		FROM reserves, boats
		where reserves.bid = boats.bid AND reserves.sid = sailors.sid))
		-- ask professor, get back to this later
		
/*3. List those sailors who have reserved only red boats.*/
/*Find sailors who have reserved red boats, exclude those who have reserved others*/
SELECT sailors.sid, sailors.sname	--Find all who have red boats
FROM sailors, reserves, boats
WHERE reserves.sid= sailors.sid AND reserves.bid = boats.bid AND boats.color = 'red'
EXCEPT
select sailors.sid, sailors.sname	--Find those who have reserved non red boats
FROM sailors, reserves, boats
WHERE reserves.sid = sailors.sid AND reserves.bid = boats.bid AND boats.color != 'red'


--4.For which boat are there the most reservations?

SELECT reserves.bid, COUNT(reserves.bid), boats.bname
FROM reserves, boats
where boats.bid = reserves.bid
GROUP BY reserves.bid, boats.bname
ORDER BY COUNT(reserves.bid) desc
Limit 1


--5.Select all sailors who have never reserved a red boat.
SELECT sailors.sid, sailors.sname	--Find all who have reserved boats
FROM sailors, reserves, boats
WHERE reserves.sid= sailors.sid AND reserves.bid = boats.bid 
EXCEPT
select sailors.sid, sailors.sname	--Find and exclude those who have reserved red boats
FROM sailors, reserves, boats
WHERE reserves.sid = sailors.sid AND reserves.bid = boats.bid AND boats.color = 'red'


--6.Find the average age of sailors with a rating of 10.
SELECT AVG(sailors.age)
FROM sailors
WHERE rating = 10


--7.For each rating, find the name and id of the youngest sailor.
SELECT S1.rating, S1.age, S1.sid, S1.sname	--Get all of the rating entires
FROM sailors S1, sailors S2
WHERE S1.rating = S2.rating AND S1.age <= S2.age
EXCEPT
SELECT S1.rating, S1.age, S1.sid, S1.sname	--Exclude values that are older
FROM sailors S1, sailors S2
WHERE S1.rating = S2.rating AND S1.age > S2.age 
GROUP BY S1.sid, S2.sname
ORDER BY rating desc


--8.Select, for each boat, the sailor who made the highest number of reservations for that boat.
SELECT DISTINCT reserves.bid, COUNT(reserves.sid) AS numReserves, reserves.sid, sailors.sname	--select from bids, number of sids, sids
From reserves, boats, sailors
where boats.bid = reserves.bid AND reserves.sid = sailors.sid--check that boat has been reserved
GROUP BY reserves.bid, reserves.sid, sailors.sname	--returns count of reserves for each sid and bid
HAVING count(reserves.sid) >1 
UNION
SELECT DISTINCT reserves.bid, COUNT(reserves.sid) AS numReserves, reserves.sid, sailors.sname	--select from bids, number of sids, sids
From reserves, boats, sailors
where boats.bid = reserves.bid AND reserves.sid = sailors.sid--check that boat has been reserved
GROUP BY reserves.bid, reserves.sid, sailors.sname	--returns count of reserves for each sid and bid
HAVING count(reserves.bid) != 2 AND count(reserves.sid) = 1
ORDER by bid desc

/*
SELECT DISTINCT reserves.bid, COUNT(reserves.sid) AS numReserves, reserves.sid, sailors.sname	--select from bids, number of sids, sids
From reserves, boats, sailors
where boats.bid = reserves.bid AND reserves.sid = sailors.sid--check that boat has been reserved
GROUP BY reserves.bid, reserves.sid, sailors.sname	--returns count of reserves for each sid and bid
--HAVING MAX(reserves.sid)
--HAVING count(reserves.sid) = 2 AND count(reserves.sid) =1
HAVING CASE
		WHEN count(DISTINCT reserves.sid) = 1 THEN 1
		WHEN count(DISTINCT reserves.bid) = 2 THEN 0
		--ELSE 1
	  END = 1
ORDER by bid DESC
*/