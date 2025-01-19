import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://haramayafoodorder:11223344@cluster0.kkcwd.mongodb.net/hufood-order').then(() =>console.log("DB Connected"));
}