import mongoose, { mongo } from "mongoose";

export const connectToDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase Connected");
        
    } catch (error) {
        console.log(error.message)
        throw new Error("Something went wrong")
    }
    
}