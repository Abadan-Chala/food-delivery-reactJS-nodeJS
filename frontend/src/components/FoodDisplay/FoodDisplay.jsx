import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [showAll, setShowAll] = useState(false);

  const filteredList = food_list.filter(item => category === "All" || category === item.category);
  
  const displayedList = showAll ? filteredList : filteredList.slice(0, 10);

  return (
    <div className="food-display" id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {displayedList.map((item, index) => (
          <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
        ))}
      </div>
      {!showAll && filteredList.length > 10 && (
        <button className='show-more' onClick={() => setShowAll(true)}>Show More</button>
      )}
      {showAll && (
        <button className='show-less' onClick={() => setShowAll(false)}>Show Less</button>
      )}
    </div>
  );
};

export default FoodDisplay;