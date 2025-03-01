import React from 'react'
import './Order.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import axios from "axios"
import parcel from '../../assets/parcel.png';

const Order = ({url}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () =>{
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const statusHanlder = async (event,orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
    
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
      <h2 className='orderTitle'>Ordered Items</h2>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={parcel} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                  if (index===order.items.length-1) {
                    return item.name + " * " + item.quantity
                  }
                  else{
                    return item.name + " * " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.email+","}</p>
                <p>{order.address.location+", "+order.address.dorm+", "+order.address.id}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>Total: {order.amount} ETB</p>
            <select onChange={(event)=>statusHanlder(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Order
