import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (Props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = (itemId) => {
        console.log("Adding to cart:", itemId);
        setCartItems((prev) => {
            const newCartItems = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            console.log("Cart items after adding:", newCartItems);
            return newCartItems;
        });
    };

    const removeFromCart = (itemId) => {
        console.log("Removing from cart:", itemId);
        setCartItems((prev) => {
            const newCartItems = { ...prev, [itemId]: prev[itemId] - 1 };
            console.log("Cart items after removing:", newCartItems);
            return newCartItems;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {Props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;