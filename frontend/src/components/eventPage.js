import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import { fetchToken } from './Auth';

const EventPage = () => {
    const { eventId } = useParams();  // Get event ID from URL params
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await api.get(`/events/${eventId}`);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    const handleJoinEvent = async () => {
        const token = fetchToken(); // Assume token includes user ID or fetch user ID from token
        const userId = token; // Simplification, implement token decoding or fetch user ID properly
        const reservationDetails = {
            uid: userId,
            eid: parseInt(eventId, 10),
        };
        try {
            await api.post('/createReservation/', reservationDetails);
            navigate(`/successPage/${eventId}`);  // Redirect to a success page or update UI accordingly
        } catch (error) {
            setError('Failed to join event');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{event.ename}</h1>
            <p>Organizer: {event.organizer}</p>
            <p>Type: {event.type}</p>
            <p>Location: {event.location}</p>
            <p>Time: {event.time} on {event.date}</p>
            <p>Capacity: {event.capacity} - Reservations: {event.reservations}</p>
            <button onClick={handleJoinEvent}>Join Event</button>
        </div>
    );
};

export default EventPage
