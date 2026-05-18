import mongoose, { Mongoose, Schema } from "mongoose";

const registerSchema = new mongoose.Schema({
    //email isn't a type in mongodb
    email: {type: String, required: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true},
    refreshToken: {type: String}
})

export default mongoose.models.Register ||  mongoose.model("Register", registerSchema)