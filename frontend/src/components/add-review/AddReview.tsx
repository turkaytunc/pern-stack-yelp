import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addRestaurantReview, isInputEmpty } from 'src/util';
import './add-reviews.scss';

const AddReview = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState('5');
  const [fetchError, setFetchError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isInputEmpty(username, userRating, comment)) return;

    try {
      const response = await addRestaurantReview(id, username, userRating, comment);
      if (response.status === 400) {
        setFetchError('fetchError');
      }
      window.location.href = `/restaurant/${id}`;
    } catch (error) {
      setFetchError(error.message);
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="add-review-form">
      <h2 className="add-review-header">Add Your Review</h2>
      <label htmlFor="review-username-input">
        <input
          className="add-review-username"
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          id="review-username-input"
          placeholder="Your Name"
          value={username}
        />
      </label>
      <label className="add-review-label" htmlFor="review-rating">
        <p>Rating</p>
        <select
          onChange={(event) => setUserRating(event.target.value)}
          className="add-review-rating"
          name="review-rating"
          id="review-rating"
          value={userRating}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label htmlFor="review-comment-input">
        <textarea
          onChange={(event) => setComment(event.target.value)}
          className="add-review-textarea"
          id="review-comment-input"
          placeholder="Comment Here"
          maxLength={100}
          cols={20}
          rows={5}
          value={comment}
        />
      </label>
      <button className="add-review-button" type="submit">
        Add Review
      </button>
      {fetchError}
    </form>
  );
};

export default AddReview;