import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import './reviewsList.css';

function ReviewsList() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/reviews/')
            .then(response => {
                setReviews(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError('Error fetching data');
                setIsLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
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
        <div>
            <h1>Customer Reviews</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
                <div>
                    {reviews.length === 0 ? (
                        <p className="no-reviews">No reviews available at the moment.</p>
                    ) : (
                        reviews.map(review => (
                            <Link key={review.id} to={`/reviews/${review.id}`} className="review-link">
                                <div className="review-container">
                                    <div className="review-header">
                                        <h2 className="review-title">{review.title}</h2>
                                        <p className="review-date">{formatDate(review.created_at)}</p>
                                    </div>
                                    <p className="review-content">{review.content}</p>
                                    <p className="review-rating">Rating: {renderStars(review.rating)}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
            <Link to="/reviews/create">
                <button className="create-review-button">Create New Review</button>
            </Link>
        </div>
    );
}

export default ReviewsList;
