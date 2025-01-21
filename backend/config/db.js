import mongoose from "mongoose";

export const connectDB = async () => {
        const conn = await mongoose.connect('mongodb+srv://haramayafoodorder:11223344@cluster0.kkcwd.mongodb.net/hufood-order').then(()=>console.log("DB Connected"));
    
};