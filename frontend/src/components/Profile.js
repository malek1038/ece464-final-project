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
        <div className="profile-container">
            <div className="profile-header">
                <h2>Welcome, {user.uname || 'Loading...'}</h2>
                <button onClick={() => navigate('/main-menu')} className="main-menu-button">Back to Main Menu</button>
                <button onClick={logOut} className="logout-button">Log Out</button>
            </div>
            <div className="reserved-events">
                <h2 style={{ textAlign: 'center' }}>Your Reservations</h2>
                {events.length > 0 ? events.map(event => (
                    <div className="event-listing" key={event.eid}>
                        <h3>{event.ename}</h3>
                        <p>Organizer: {event.organizer}</p>
                        <p>Type: {event.type}</p>
                        <p>Location: {event.location}</p>
                        <p>Date: {event.date} at {event.time}</p>
                        <button onClick={() => deleteReservation(event.eid)}>Delete Reservation</button>
                    </div>
                )) : <p>No reservations found.</p>}
            </div>
        </div>
    );
};

export default Profile;
