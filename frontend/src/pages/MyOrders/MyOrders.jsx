// import React, { useContext, useEffect, useState } from 'react'
// import './MyOrders.css'
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import parcel from "../../assets/parcel.png"

// const MyOrders = () => {

//     const {url,token} = useContext(StoreContext);
//     const [data,setData] = useState([]);

//     const fetchOrders = async () =>{
//         const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//         setData(response.data.data);
//     }

//     useEffect(()=>{
//         if (token) {
//             fetchOrders();
//         }
//     },[token])

//   return (
//     <div className='my-orders'>
//       <h2>My Orders</h2>
//       <div className="container">
//         {data.map((order,index)=>{
//             return (
//                 <div className='my-orders-order'>
//                     <img src={parcel} alt="" />
//                     <p>{order.items.map((item,index)=>{
//                         if (index === order.items.length-1) {
//                             return item.name+" x "+item.quantity
//                         }
//                         else{
//                             return item.name+" x "+item.quantity+" + "
//                         }
//                     })}</p>
//                     <p>{order.amount}.00 ETB</p>
//                     <p>Items: {order.items.length}</p>
//                     <p><span>&#x25cf;</span><b>{order.status}</b></p>
//                     <button onClick={fetchOrders}>Track Order</button>
//                 </div>
//             )
//         })}
//       </div>
//     </div>
//   )
// }

// export default MyOrders




import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import parcel from "../../assets/parcel.png";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            if (response.data.success) {
                setData(response.data.data); // Set order data
            } else {
                setError("Failed to fetch orders. Please try again."); // Set error message
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("An error occurred while fetching orders."); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders(); // Fetch orders when the component mounts or token changes
        }
    }, [token]);

    if (loading) {
        return <div className="my-orders">Loading orders...</div>; // Show loading message
    }

    if (error) {
        return <div className="my-orders">{error}</div>; // Show error message
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders found.</p> // Show message if no orders exist
                ) : (
                    data.map((order, index) => (
                        <div className='my-orders-order' key={index}>
                            <img src={parcel} alt="Parcel" />
                            <p>
                                {order.items.map((item, index) => (
                                    <span key={index}>
                                        {item.name} x {item.quantity}
                                        {index !== order.items.length - 1 && " + "}
                                    </span>
                                ))}
                            </p>
                            <p>{order.amount}.00 ETB</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span>&#x25cf;</span>
                                <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
