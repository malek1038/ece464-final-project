import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const CreateEventPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ename: '',
        organizer: '',
        type: '',
        location: '',
        capacity: '',
        reservations: '0', // Default to zero since creating new event
        time: '',
        date: '',
        tags: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/createEvent/', formData);
            alert('Event created successfully!');
            navigate('/main-menu');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event!');
        }
    };

    return (
        <div>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <input name="ename" value={formData.ename} onChange={handleChange} placeholder="Event Name" required />
                <input name="organizer" value={formData.organizer} onChange={handleChange} placeholder="Organizer" required />
                <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" required />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" required />
                <input name="time" value={formData.time} onChange={handleChange} placeholder="Time" required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags" required />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEventPage
