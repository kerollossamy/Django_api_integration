import React, { useState } from 'react';
import axios from 'axios';
import './EditReviewForm.css'

function EditReviewForm({ review, onClose }) {
  const [title, setTitle] = useState(review.title);
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/reviews/${review.id}/`, {
        title,
        content,
        rating
      });
      onClose();
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  return (
    <div className="edit-review-form-container">
      <h2 className="form-title">Edit Review</h2>
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
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditReviewForm;