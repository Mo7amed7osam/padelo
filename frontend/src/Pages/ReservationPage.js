import React, { useState, useEffect } from 'react';
import "../Pages Styles/ReservationPage.css";

const PadelBooking = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '',
    day: '', // Store the selected day
  });
  const [court, setCourt] = useState(null);
  const [slots, setSlots] = useState([]);

  const courtId = '6757841ee74562272e6c40f6'; // Set the courtId you want to fetch

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/courts/${courtId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourt(data.court); 
        setSlots(getAvailableSlots(data.court.schedule)); 
      })
      .catch((error) => console.error("Error fetching court:", error));
  }, [courtId]);

  // Helper function to get available slots
  const getAvailableSlots = (schedule) => {
    const availableSlots = [];
    schedule.forEach((daySchedule) => {
      daySchedule.slots.forEach((slot) => {
        if (!slot.reserved) {
          availableSlots.push({
            number: slot.number,
            day: daySchedule.day,  // Add the day of the schedule
          });
        }
      });
    });
    return availableSlots;
  };

  const durations = [
    { value: 1, label: '1 Hour' },
    { value: 2, label: '2 Hours' },
    { value: 3, label: '3 Hours' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      
      // If the date is being changed, update the day based on the selected date
      if (name === 'date' && value) {
        const selectedDay = new Date(value).toLocaleString('en-us', { weekday: 'long' });
        updatedData.day = selectedDay;
      }
      
      return updatedData;
    });
  };

  const day = formData.day || ''; // Use the day from formData directly

  // Filter slots based on the selected day
  const filteredSlots = slots.filter((slot) => slot.day === day);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Successful!\nDate: ${formData.date}\nTime: ${formData.time}\nDuration: ${formData.duration}`);
  };

  return (
    <div className="container">
      <div className="court-info" style={{ backgroundImage: `url(${require("../assets/R.jpg")})` }}>
        <h2>{court ? court.name : 'Loading...'}</h2>
        <p>{court ? court.location : 'Loading location...'}</p>
        <p>+201120966038</p>
      </div>

      {/* Show the selected day */}
      <p className="day">{day}</p>

      {/* Booking Section */}
      <section className="booking-container">
        <h2>Book within one week</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

          <label htmlFor="time">Time</label>
          <select id="time" name="time" value={formData.time} onChange={handleChange} required>
            <option value="">Select time</option>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <option key={slot.number} value={slot.number}>{`Slot ${slot.number} (${slot.day})`}</option>
              ))
            ) : (
              <option value="">No available slots</option>
            )}
          </select>

          <label htmlFor="duration">Duration</label>
          <select id="duration" name="duration" value={formData.duration} onChange={handleChange} required>
            <option value="">Select duration</option>
            {durations.map((duration, index) => (
              <option key={index} value={duration.value}>{duration.label}</option>
            ))}
          </select>

          <p>Price: <strong>{court ? court.price : 'Loading...'} LE</strong></p>
          <button type="submit">Book</button>
        </form>
      </section>

      {/* Slots Section */}
      <section className="slots-container">
        <h3>Available Slots</h3>
        <div className="slots-list">
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <div key={slot.number} className="slot available">
                {` ${slot.number} clock (${slot.day})`}
              </div>
            ))
          ) : (
            <div>No available slots for the selected day</div>
          )}
        </div>
      </section>

      {/* Ratings and Map Section */}
      <section className="ratings-container">
        <h3>Ratings & Comments</h3>
        <p>Share your experience here!</p>
      </section>

      <section className="map-container">
        <h3>Find us now</h3>
        <iframe
          src="https://maps.google.com/maps?q=6%20October%20City,%20Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed"
          title="Google Map"
          frameBorder="0"
        ></iframe>
        <p className="footer">
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Get Directions</a>
        </p>
      </section>
    </div>
  );
};

export default PadelBooking;
