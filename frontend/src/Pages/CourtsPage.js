import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/Courts.css";
import defaultCourtImage from "../assets/OIP.jpg";

function Courts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courts, setCourts] = useState([]);
  const navigate = useNavigate();

  // Fetch all courts from the API
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/courts")
      .then((response) => response.json())
      .then((data) => {
        setCourts(data.courts);
      })
      .catch((error) => console.error("Error fetching courts:", error));
  }, []);

  // Filter courts based on search query
  const filteredCourts = searchQuery
    ? courts.filter((court) => {
        const query = searchQuery.trim().toLowerCase();
        return (
          court.name.toLowerCase().includes(query) ||
          court.location.toLowerCase().includes(query)
        );
      })
    : courts;

  // Navigate to the reservation page with the selected court's by it's id
  const handleCourtClick = (courtId) => {
    navigate(`/reservation/${courtId}`);
  };

  return (
    <div className="courts-page">
      {/* Header */}
      <Header />

      {/* Image Section */}
      <div className="image-container">
        <div className="main-text">Book now in 3 steps with:</div>
        <div className="padelo-text">PADELO</div>
        <div className="steps-text">
          <span className="step">1 - Choose court</span>
          <span className="step">2 - Select duration</span>
          <span className="step">3 - Confirmation</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Court name, Location"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={() => setSearchQuery("")}>
            Clear
          </button>
        </div>
      </div>

      {/* Courts List */}
      <div className="courts-container">
        {filteredCourts.length > 0 ? (
          filteredCourts.map((court) => (
            <div
              key={court._id} 
              className="Courts-court-card"
              onClick={() => handleCourtClick(court._id)}
              style={{ cursor: "pointer" }} // Make cards clickable
            >
              <img
                src={court.image || defaultCourtImage}
                alt={court.name}
                className="court-image"
              />
              <div className="court-info">
                <h3 className="court-name">Court {court.name}</h3>
                <p className="court-location">Location: {court.location}</p>
                <p className="court-phone">Phone: {court.contactNumber}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">
            No courts found. Please try a different search.
          </p>
        )}
      </div>
    </div>
  );
}

export default Courts;
