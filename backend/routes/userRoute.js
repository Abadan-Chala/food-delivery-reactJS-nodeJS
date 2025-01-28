import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import multer from "multer";
import path from "path";
import User from "../models/userModel.js"; // Ensure you have the User model

const userRouter = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// User registration and login routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile image upload route
userRouter.post("/upload-profile-image", upload.single('profileImage'), async (req, res) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const profileImageUrl = `/uploads/${req.file.filename}`;

  try {
    // Assuming you have user authentication and can get the user ID from the request
    const userId = req.user.id; // Adjust this based on your authentication setup

    // Update user's profile image in the database
    const user = await User.findByIdAndUpdate(userId, { profileImage: profileImageUrl }, { new: true });

    if (!user) {
      console.error('User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, profileImage: profileImageUrl });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

export default userRouter;