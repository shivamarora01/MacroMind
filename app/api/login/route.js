import { connectDB } from "../../../lib/connectDB"
import { withErrorWrapper } from "../../../lib/withErrorWrapper"
import { APIError } from "../../../lib/APIError";
import Register from "./../../../models/register";
import bcrypt from "bcrypt";

export const POST = withErrorWrapper(async(request) => {
    await connectDB();
    const body = await request.json();
    const {email, password} = body;
    //if email, password is empty
    if([email, password].some((field) => 
       !field || field?.trim() === "" )){
        throw new APIError("Please enter all fields", 400);
    }
    //if all good, write the query to check for Server
    const exisitingUser = await Register.findOne({email});
    if(!exisitingUser){
        throw new APIError("No user exists with this email", 400);
    }
    //if you get the exisitingUser, try matching the password via bcrypt hashing
    const passwordMatch = await bcrypt.compare(password, exisitingUser.password);
    if(!passwordMatch){
        throw new APIError("Wrong Password", 400);
    }
    return Response.json({status: "ok", message: "You have logged in"})
})