import React, { useContext } from 'react';
import './FoodItem.css';
import rate from '../../assets/rate.jpg';
import add from '../../assets/add.jpg';
import remove from '../../assets/remove.png';
import plus from '../../assets/plus.png';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/uploads/${image}`} alt={name} />
        {!cartItems[id]
          ? <img className='add' src={add} alt="add" onClick={() => addToCart(id)} />
          : <div className="food-item-counter">
              <img src={remove} alt="remove" onClick={() => removeFromCart(id)} />
              <p>{cartItems[id]}</p>
              <img src={plus} alt="add" onClick={() => addToCart(id)} />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3>{name}</h3>
          <img src={rate} alt="rating" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;