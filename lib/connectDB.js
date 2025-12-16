//let's connect the database

import mongoose from "mongoose";
const DB_URI = process.env.MONGODB_URI

if (!DB_URI) {
  throw new Error("Please define MONGODB_URI in environment variables");
}

export const connectDB = async () => {
    try {
        //check if it is already connected
        if(mongoose.connection.readyState === 1){
            console.log("database already connected");
            return;
        }
        await mongoose.connect(DB_URI, {
            dbName: "Macros",
        })
        console.log("database connected");
    } catch (error) {
        console.log("error occured", error);
    }
}
