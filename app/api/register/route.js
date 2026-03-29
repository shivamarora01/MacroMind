//this is a register api

//connect the db
//get data from model
import bcrypt from "bcrypt";
import { APIError } from "../../../lib/APIError";
import { connectDB } from "../../../lib/connectDB";
import { withErrorWrapper } from "../../../lib/withErrorWrapper";
import Register from './../../../models/register'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
import { cookies } from "next/headers";

//process to register
//1. get all the data
//2. validate if all data is coming
//3. check if mail already in db
//4. if not , let the user register

export const POST =  withErrorWrapper(async (request) => {
    await connectDB();
    //take data from request body by destructing
    const body = await request.json();
    console.log("request", request, "body", body);
    const {email, fullname, password} = body;
    console.log("Data entered in fields and sent to api ", {email, fullname, password});
    if([email, fullname, password].some((field) => 
        !field || field?.trim() === ""
    )){
        // throw new Error("ADD FIELDS PLS", 208)
        throw new APIError("all fields should be filled Please", 400);
    }
    //5. check if the email already exisiting in db
    const exisitingUser = await Register.findOne({email});
    console.log("existingUser",exisitingUser);
    if(exisitingUser){
        throw new APIError("User already exisiting", 400);
    }
    //6. if no email registerd, Create one
    //hashing the password
    //10 is salt rounds(security level)
    const hashedPass = await bcrypt.hash(password, 10);
    const newRegister = await Register.create({
        email: body.email,
        fullname: body.fullname,
        password: hashedPass
    })
    console.log("newregister",newRegister);
    //on-regsiter we wanna set a token
    const token = jwt.sign(
        {userId: newRegister._id, email: newRegister.email},
        JWT_SECRET,
        {expiresIn: "1h"}
    );
    console.log("token", token);
    //token we have, now set the cookies
    const cookieStore = await cookies();
    cookieStore.set("token", token, 
        {httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60*60,
        }
    );
    console.log("cookie", cookieStore);

    return Response.json({status: "ok"}, {newRegister})
})