import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Modal from './confirmationModal';
import './reviewDetail.css';

function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/reviews/${id}/`);
        setReview(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/reviews/${id}/`);
      setIsModalOpen(false);
      window.location.href = '/reviews';
    } catch (error) {
      console.error('Error deleting review:', error);
      setIsDeleting(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star" style={{ color: '#f39c12' }}>★</span>);
      } else {
        stars.push(<span key={i} className="star" style={{ color: '#ccc' }}>★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="review-detail-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {review && (
        <div className="review-detail">
          <h2>{review.title}</h2>
          <p>{review.content}</p>
          <p className="review-rating">Rating: {renderStars(review.rating)}</p>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isDeleting}
            >
              Delete
            </button>
            <Link to="/reviews">
              <button className="back-button">Back to Reviews List</button>
            </Link>
          </div>
          <Modal
            isOpen={isModalOpen}
            message="Are you sure you want to delete this review?"
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default ReviewDetail;
