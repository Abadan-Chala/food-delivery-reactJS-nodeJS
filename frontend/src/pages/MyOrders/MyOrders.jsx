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

    // Function to handle tracking order status
    const handleTrackOrder = (status) => {
        let message = "";
        switch (status) {
            case "Food Processing":
                message = "Your order is being processed.";
                break;
            case "Out for delivery":
                message = "Your order is out for delivery.";
                break;
            case "Delivered":
                message = "Your order has been delivered.";
                break;
            default:
                message = "Unable to determine the status of your order.";
        }
        alert(message); // Display the status message
    };

    // Function to handle status change
    const statusHandler = async (event, orderId) => {
        const newStatus = event.target.value;
        try {
            const response = await axios.post(
                `${url}/api/order/update-status`,
                { orderId, status: newStatus },
                { headers: { token } }
            );
            if (response.data.success) {
                fetchOrders(); // Refresh orders after updating status
            } else {
                alert("Failed to update order status.");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("An error occurred while updating order status.");
        }
    };

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
                            {/* Updated Track Order button */}
                            <button onClick={() => handleTrackOrder(order.status)}>Order Status</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;