import React, { useState } from 'react';
import './App.css';

type Event = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  adminApproval: boolean;
};

const App: React.FC = () => {
  const [event, setEvent] = useState<Event>({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    adminApproval: false,
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isVisible, setIsVisible] = useState(false); // Visibility state for the form and table

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent((prev) => ({
      ...prev,
      adminApproval: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!event.title) newErrors.title = 'Title is required.';
    if (!event.description) newErrors.description = 'Description is required.';
    if (!event.date) newErrors.date = 'Date is required.';
    if (!event.startTime) newErrors.startTime = 'Start time is required.';
    if (!event.endTime) newErrors.endTime = 'End time is required.';
    if (!event.location) newErrors.location = 'Location is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add the event to the list
    setEvents((prev) => [...prev, event]);

    // Reset the form
    setEvent({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      adminApproval: false,
    });

    // Clear errors
    setErrors({});
  };

  return (
    <div className="app">
      <button className="open-button" onClick={() => setIsVisible(true)}>
        Add New Event
      </button>

      {isVisible && (
        <div className="container fade-in">
          <h1 className="title">Admin Dashboard: Add Events</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={event.title}
                onChange={handleChange}
                className={`input ${errors.title ? 'error' : ''}`}
              />
              {errors.title && <small className="error-text">{errors.title}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={event.description}
                onChange={handleChange}
                className={`textarea ${errors.description ? 'error' : ''}`}
              ></textarea>
              {errors.description && <small className="error-text">{errors.description}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                className={`input ${errors.date ? 'error' : ''}`}
              />
              {errors.date && <small className="error-text">{errors.date}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={event.startTime}
                onChange={handleChange}
                className={`input ${errors.startTime ? 'error' : ''}`}
              />
              {errors.startTime && <small className="error-text">{errors.startTime}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={event.endTime}
                onChange={handleChange}
                className={`input ${errors.endTime ? 'error' : ''}`}
              />
              {errors.endTime && <small className="error-text">{errors.endTime}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={event.location}
                onChange={handleChange}
                className={`input ${errors.location ? 'error' : ''}`}
              />
              {errors.location && <small className="error-text">{errors.location}</small>}
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="adminApproval"
                checked={event.adminApproval}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="adminApproval">Admin Approval</label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="button primary">Submit</button>
              <button type="button" className="button secondary" onClick={() => setIsVisible(false)}>
                Cancel
              </button>
            </div>
          </form>

          <h2 className="title">Submitted Events</h2>
          {events.length === 0 ? (
            <p>No events added yet.</p>
          ) : (
            <table className="events-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Location</th>
                  <th>Admin Approval</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt, index) => (
                  <tr key={index}>
                    <td>{evt.title}</td>
                    <td>{evt.description}</td>
                    <td>{evt.date}</td>
                    <td>{evt.startTime}</td>
                    <td>{evt.endTime}</td>
                    <td>{evt.location}</td>
                    <td>{evt.adminApproval ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
