import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import { fetchToken } from './Auth';

const EventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUserAttending, setIsUserAttending] = useState(false);

    // useCallback to memoize fetchEventAndAttendees function
    const fetchEventAndAttendees = useCallback(async () => {
        try {
            const [eventResponse, attendeesResponse] = await Promise.all([
                api.get(`/events/${eventId}`),
                api.get(`/usersByEvent/${eventId}`)
            ]);
            setEvent(eventResponse.data);
            setAttendees(attendeesResponse.data);

            const userId = parseInt(fetchToken(), 10);
            setIsUserAttending(attendeesResponse.data.some(user => user.uid === userId));
            setLoading(false);
        } catch (error) {
            setError(`Failed to fetch event details or attendees: ${error}`);
            setLoading(false);
        }
    }, [eventId]);  // Dependency array includes eventId to ensure the function updates if eventId changes

    useEffect(() => {
        fetchEventAndAttendees();
    }, [fetchEventAndAttendees]);  // useEffect now depends on the memoized function

    const handleJoinEvent = async () => {
        const userId = parseInt(fetchToken(), 10);
        const reservationDetails = {
            uid: userId,
            eid: parseInt(eventId, 10),
        };
        try {
            await api.post('/createReservation/', reservationDetails);
            await fetchEventAndAttendees();  // Refetch the data to update the state
        } catch (error) {
            setError(`Failed to join event: ${error}`);
        }
    };

    const handleCancelReservation = async () => {
        const userId = parseInt(fetchToken(), 10);
        try {
            await api.post('/deleteReservation/', { uid: userId, eid: parseInt(eventId, 10) });
            await fetchEventAndAttendees();
        } catch (error) {
            setError(`Failed to cancel reservation: ${error}`);
        }
    };

    const handleBackToMenu = () => {
        navigate('/main-menu');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="event-page-container">
            <button onClick={handleBackToMenu} style={{ margin: '10px 0' }}>Back to Main Menu</button>
            <h1>{event.ename}</h1>
            <p>Organizer: {event.organizer}</p>
            <p>Type: {event.type}</p>
            <p>Location: {event.location}</p>
            <p>Time: {event.time} on {event.date}</p>
            <p>Capacity: {event.capacity} - Reservations: {event.reservations}</p>
            {!isUserAttending && <button onClick={handleJoinEvent}>Join Event</button>}
            {isUserAttending && <button onClick={handleCancelReservation}>Cancel Reservation</button>}
            <div>
                <h2>Attendees</h2>
                <ul>
                    {attendees.map((user, index) => (
                        <li key={index}>{user.uname}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventPage;
