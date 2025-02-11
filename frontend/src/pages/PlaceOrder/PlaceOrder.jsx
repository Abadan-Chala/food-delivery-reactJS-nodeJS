import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    city:"",
    id:"",
    location:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+5,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("Error");
    }   
  }

  const navigate = useNavigate();

  useEffect(() =>{
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount()===0) {
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <div className="multi-fields">
          <input required name='location' onChange={onChangeHandler} value={data.location} type="text" placeholder='location' />
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        </div>
        <div className="multi-fields">
      <input required name="id" onChange={onChangeHandler} value={data.id} type="text" placeholder="Id" pattern="^\d{4}/\d{2}$" title="Please enter a valid ID"
      />
    </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Total Carts Information</h2>
          <div>
          <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 5} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5} ETB</b>
            </div>
          </div>
          <button type='sumbit'>PROCEED TO PAYMENT</button>
        </div>

      </div>
      
    </form>
  )
}

export default PlaceOrder
