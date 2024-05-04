import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchToken, dropToken } from './Auth';
import api from './api';

const MainMenu = () => {
    const navigate = useNavigate();
    const token = fetchToken();
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/getAllEvents/');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${token}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchEvents();
        fetchUser();
    }, [token]);

    const logOut = () => {
        dropToken();
        navigate('/');
    };

    return (
        <div>
            <div className="header">
                <div>Welcome, {user.uname || 'Guest'}</div>
                <div>
                    <Link to="/profile">Profile</Link>
                    <button onClick={logOut}>Log Out</button>
                </div>
            </div>
            <h2>Main Menu</h2>
            <div className="event-grid">
                {events.map(event => (
                    <Link to={`/event/${event.eid}`} key={event.eid} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="event-card">
                            <h3>{event.ename}</h3>
                            <p>Organizer: {event.organizer}</p>
                            <p>Type: {event.type}</p>
                            <p>Location: {event.location}</p>
                            <p>Date: {event.date} at {event.time}</p>
                            <p>Capacity: {event.capacity} - Reservations: {event.reservations}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainMenu;
