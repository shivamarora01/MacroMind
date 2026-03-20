import { connectDB } from "../../../lib/connectDB"
import { withErrorWrapper } from "../../../lib/withErrorWrapper"
import { APIError } from "../../../lib/APIError";
import Register from "./../../../models/register";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET

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
    console.log("existingUser", exisitingUser);
    //if you get the exisitingUser, try matching the password via bcrypt hashing
    const passwordMatch = await bcrypt.compare(password, exisitingUser.password);
    if(!passwordMatch){
        throw new APIError("Wrong Password", 400);
    }
    //generate a JWT Token
    const token = jwt.sign(
        //payload data of user, not encrypted, just encoded
        {userId: exisitingUser._id, email: exisitingUser.email},
        //
        JWT_SECRET,
        //can accept d, m, s-> day, month, seconds
        {expiresIn: "1h"}
    );
    //Store the token in a cookie (session)
    //in newer Next.js (15+/16). cookies() is now async
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60
    });
    console.log("cookieStore", cookieStore);
    return Response.json({status: "ok", message: "You have logged in"})
})