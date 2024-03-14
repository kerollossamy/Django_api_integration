import React, { useState } from 'react';
import axios from 'axios';
import './reviewForm.css';
import { Link } from 'react-router-dom';

function ReviewForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/reviews/', {
        title,
        content,
        rating
      });
      window.location.href = '/reviews';
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="review-form-container">
      <h2 className="form-title">Create Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-input" />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} className="form-input" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <Link to="/reviews">
        <button className="back-button">Back to Reviews List</button>
      </Link>
    </div>
  );
}

export default ReviewForm;
