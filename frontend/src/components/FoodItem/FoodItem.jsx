import React, { useState } from 'react'
import './FoodItem.css'
import rate from '../../assets/rate.jpg'

const FoodItem = ({id,name,price,description,image}) => {

  const [itemCount, setItemCount] = useState(0);
  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img className='food-item-image' src={image} alt={name} />
            {!itemCount
            ?<img className='add' src="https://img.icons8.com/ios/452/plus.png" alt="add" onClick={() => setItemCount(prev=>prev + 1)} />
            :<div className="food-item-count">
            
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
  )
}

export default FoodItem
