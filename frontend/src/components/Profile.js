import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, dropToken } from "./Auth";
import api from "./api";

const Profile = () => {
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const token = fetchToken();

    const logOut = () => {
        dropToken();
        navigate("/");
    };

    const fetchEvents = async () => {
        try {
            const response = await api.get(`/eventsByUser/${token}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching your reserved events:', error);
        }
    };

    const deleteReservation = async (eventId) => {
        try {
            await api.post("/deleteReservation/", { uid: user.uid, eid: eventId });
            fetchEvents();
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${token}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
    
        fetchUser();
        fetchEvents();
    }, [token]);

    return (
        <div>
            <div className="header">
                <h2>Welcome, {user.uname || 'Loading...'}</h2>
                <p>Profile page</p>
                <button onClick={logOut}>Log Out</button>
            </div>
            <div className="reserved-events">
                <h2>Your Reservations</h2>
                {events.map(event => (
                    <div className="event-listing" key={event.eid}>
                        <h3>{event.ename}</h3>
                        <p>Organizer: {event.organizer}</p>
                        <p>Type: {event.type}</p>
                        <p>Location: {event.location}</p>
                        <p>Date: {event.date} at {event.time}</p>
                        <button onClick={() => deleteReservation(event.eid)}>Delete Reservation</button>
                    </div>
                )) || 'Loading reservations...'}
            </div>
        </div>
    );
};

export default Profile;
