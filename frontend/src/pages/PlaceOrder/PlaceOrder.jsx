import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dorm: "",
        id: "",
        location: "",
        phone: ""
    });
    const [selectedBank, setSelectedBank] = useState(""); // State to store the selected bank
    const [accountNumber, setAccountNumber] = useState(""); // State to store the account number
    const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success
    const [orderDetails, setOrderDetails] = useState(null); // State to store order details for confirmation
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleBankChange = (event) => {
        setSelectedBank(event.target.value); // Update the selected bank
    };

    const handleAccountNumberChange = (event) => {
        setAccountNumber(event.target.value); // Update the account number
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        // Prepare order items
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        // Prepare order data
        let orderData = {
            userId: token.userId,
            items: orderItems,
            amount: getTotalCartAmount() + 5, // Include delivery fee
            address: data,
            selectedBank: selectedBank,
            accountNumber: accountNumber,
        };

        try {
            // Send order data to the backend
            const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });

            if (response.data.success) {
                setOrderDetails(response.data.order); // Save order details for confirmation
                setPaymentSuccess(true); // Show payment success message
            } else {
                alert("Error placing order. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Redirect if no token or empty cart
    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]);

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
                    <input required name='location' onChange={onChangeHandler} value={data.location} type="text" placeholder='Location' />
                    <input required name='dorm' onChange={onChangeHandler} value={data.dorm} type="text" placeholder='Dorm no' />
                </div>
                <div className="multi-fields">
                    <input required name="id" onChange={onChangeHandler} value={data.id} type="text" placeholder="ID" pattern="^\d{4}/\d{2}$" title="Enter a valid ID" />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone Number' />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Total Cart Information</h2>
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

                    {/* Styled Bank Selection Dropdown */}
                    <div className="styled-bank-selection">
                        <label htmlFor="bank">Select Bank:</label>
                        <select id="bank" name="bank" value={selectedBank} onChange={handleBankChange} required>
                            <option value="">--Select a Bank--</option>
                            <option value="Commercial Bank">Commercial Bank</option>
                            <option value="Awash Bank">Awash Bank</option>
                            <option value="Oromia Bank">Oromia Bank</option>
                            {/* Add more banks as needed */}
                        </select>
                    </div>

                    {/* Styled Account Number Input */}
                    <div className="styled-account-number">
                        <label htmlFor="accountNumber">Account Number:</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            value={accountNumber}
                            onChange={handleAccountNumberChange}
                            required
                        />
                    </div>

                    {/* Proceed to Payment Button */}
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>

            {/* Styled Payment Success Message */}
            {paymentSuccess && orderDetails && (
                <div className="styled-payment-success">
                    <h2>Payment Successful!</h2>
                    <p>Your order has been placed successfully.</p>
                    <div className="order-details">
                        <h3>Order Details</h3>
                        <p><strong>Order ID:</strong> {orderDetails._id}</p>
                        <p><strong>Total Amount:</strong> {orderDetails.amount} ETB</p>
                        <p><strong>Items:</strong></p>
                        <ul>
                            {orderDetails.items.map((item, index) => (
                                <li key={index}>
                                    {item.name} (x{item.quantity}) - {item.price * item.quantity} ETB
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => navigate('/myorders')}>View Your Orders</button>
                </div>
            )}
        </form>
    );
};

export default PlaceOrder;