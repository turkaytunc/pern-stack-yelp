import React, { useEffect, useState } from 'react';
import './restaurant-details.scss';
import { AddReview, ReviewCard, StarRate } from 'src/components';
import { getReviewsByRestaurantId } from 'src/util';
import { useParams } from 'react-router-dom';
import { Review } from 'src/interfaces';

const RestaurantDetails = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  const [restaurant, setRestaurant] = useState<Review[]>([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchRestaurantReview = async () => {
      try {
        const response = await getReviewsByRestaurantId(id);
        const data = await response.json();
        if (response.status === 200) {
          setRestaurant(data);
        } else {
          setFetchError(data.message);
          return;
        }
        setRestaurant(data);
      } catch (error) {
        setFetchError(error.message);
      }
    };
    fetchRestaurantReview();
  }, []);

  return (
    <div className="restaurant-details-container">
      <header className="restaurant-details-header">Restaurant Details</header>
      <StarRate rating={3.3} />
      <div className="restaurant-details-card-grid">
        {restaurant.map((item) => (
          <ReviewCard key={item.id} rating={item.rating} name={item.name} comment={item.comment} />
        ))}
      </div>
      {fetchError}
      <AddReview />
    </div>
  );
};

export default RestaurantDetails;
