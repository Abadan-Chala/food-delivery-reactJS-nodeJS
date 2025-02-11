import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        // Find the user and initialize cartData if it doesn't exist
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData is initialized as an object
        let cartData = userData.cartData || {};

        // Add or update item count in cart
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Update the user with new cartData
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // Decrease item count or remove it from the cart
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // Remove item if count is zero
            }
        } else {
            return res.status(400).json({ success: false, message: "Item not in cart" });
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving cart" });
    }
};

export { addToCart, removeFromCart, getCart };