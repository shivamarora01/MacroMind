//let's connect the database

import mongoose from "mongoose";
const DB_URI = 'mongodb+srv://connectedshivam_db_user:gQdIVZiGm69DSB6Z@cluster0.l6voqjf.mongodb.net/?appName=Cluster0'

export const connectDB = async () => {
    try {
        //check if it is already connected
        if(mongoose.connection.readyState === 1){
            console.log("database already connected");
            return;
        }
        await mongoose.connect(DB_URI, {
            dbName: "Workouts",
        })
        console.log("database connected");
    } catch (error) {
        console.log("error occured", error);
        process.exit(1);
    }
}
