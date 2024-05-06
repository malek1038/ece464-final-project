import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchToken, dropToken } from './Auth';
import api from './api';

const MainMenu = () => {
    const navigate = useNavigate();
    const token = fetchToken();
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const [query, setQuery] = useState('');

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

    const goToProfile = () => {
        navigate('/profile');
    };

    const searchQuery = async () => {
        try {
            const response = await api.get(`/searchEvents/?query=${query}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error with search:', error);
        }
    };

    return (
        <div>
            <div className="header">
                <div>Welcome, {user.uname || 'Guest'}</div>
                <div>
                    <button onClick={goToProfile}>Profile</button>
                    <button onClick={logOut}>Log Out</button>
                </div>
            </div>
            <div className="search-bar">
                <input name='query' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search for events...'/>
                <button onClick={searchQuery}>Submit</button>
                <button onClick={() => navigate('/create-event')}>Create Event</button>
            </div>
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
