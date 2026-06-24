import { connectDB } from "../../../lib/connectDB"
import { withErrorWrapper } from "../../../lib/withErrorWrapper"
import { APIError } from "../../../lib/APIError";
import Register from "./../../../models/register";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ratelimiter } from "../../../lib/ratelimiter";
import { validateLogin } from "../../../lib/loginMiddleware";
import winston from "winston";
const JWT_SECRET = process.env.JWT_SECRET
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH

//crate limiter
const loginLimiter  =  ratelimiter({
    window: 60*1000,
    maxRequest: 5
})

//create logger from winston
//transports are destinations
//console is what to show on terminal
//File is where we will store the logs
//level: "info" sets the minimum severity level that will be logged.
//Winston's default priorities are:
// error: 0 (highest priorty)
// warn:  1
// info:  2
// http:  3
// verbose: 4
// debug: 5
// silly: 6
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "login.js"})
    ]
})

// export const POST = withErrorWrapper(async(request) => {

//     //get ip
//     const ip = request.headers.get("x-forwarded-for") ||  request.headers.get("x-real-ip") || "unknown";
//     console.log("this is the ip address",ip);
//     //check rate limit
//     const {allowed} = loginLimiter(ip);
//     //if not allowed return error
//     if(!allowed){
//         throw new APIError("Too many requests", 429);
//     }
//     await connectDB();
//     const body = await request.json();
//     const {email, password} = body;
//     //if email, password is empty
//     if([email, password].some((field) => 
//        !field || field?.trim() === "" )){
//         throw new APIError("Please enter all fields", 400);
//     }
//     //if all good, write the query to check for Server
//     const exisitingUser = await Register.findOne({email});
//     if(!exisitingUser){
//         throw new APIError("No user exists with this email", 401);
//     }
//     console.log("existingUser", exisitingUser);
//     //if you get the exisitingUser, try matching the password via bcrypt hashing
//     const passwordMatch = await bcrypt.compare(password, exisitingUser.password);
//     if(!passwordMatch){
//         throw new APIError("Wrong Password", 400);
//     }
//     //generate a JWT Token
//     const token = jwt.sign(
//         //payload data of user, not encrypted, just encoded
//         {userId: exisitingUser._id, email: exisitingUser.email},
//         //
//         JWT_SECRET,
//         //can accept d, m, s-> day, month, seconds
//         {expiresIn: "1h"}
//     );
//     //Store the token in a cookie (session)
//     //in newer Next.js (15+/16). cookies() is now async
//     const cookieStore = await cookies();
//     cookieStore.set("token", token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "none",
//         maxAge: 60 * 60
//     });
//     console.log("cookieStore", cookieStore);
//     return Response.json({status: "ok", message: "You have logged in"})
// })

export const POST = withErrorWrapper(validateLogin(async(request) => {

    //get ip
    const ip = request.headers.get("x-forwarded-for") ||  request.headers.get("x-real-ip") || "unknown";
    console.log("this is the ip address",ip);
    //check rate limit
    const {allowed} = loginLimiter(ip);
    //if not allowed return error
    if(!allowed){
        throw new APIError("Too many requests", 429);
    }
    await connectDB();
    const {email, password} = request.validatedBody;
    //if all good, write the query to check for Server
    const exisitingUser = await Register.findOne({email});
    if(!exisitingUser){
        throw new APIError("No user exists with this email", 401);
    }
    console.log("existingUser", exisitingUser);
    //if you get the exisitingUser, try matching the password via bcrypt hashing
    const passwordMatch = await bcrypt.compare(password, exisitingUser.password);
    if(!passwordMatch){
        throw new APIError("Wrong Password", 400);
    }
    logger.info("Password & Email Matched!!")
    //generate a JWT Token
    const token = jwt.sign(
        //payload data of user, not encrypted, just encoded
        {userId: exisitingUser._id, email: exisitingUser.email},
        //
        JWT_SECRET,
        //can accept d, m, s-> day, month, seconds
        {expiresIn: "1h"}
    );
    const refreshToken = jwt.sign(
        //payload
        {userId: exisitingUser.id},
        //secret key diff
        JWT_SECRET_REFRESH,
        //expiry time
        {expiresIn: "6d"}
    )
    //Store the token in a cookie (session)
    //in newer Next.js (15+/16). cookies() is now async
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        //Prevents JavaScript access. Protects against: XSS attacks
        httpOnly: true,
        //Cookie sent only over HTTPS. Protects against: network sniffing
        secure: true,
        //"strict", Helps prevent CSRF attacks. Browser won’t send cookie from other websites automatically.
        sameSite: "lax",
        maxAge: 60 * 60
    });

    cookieStore.set("refreshToken", refreshToken, {
        httpOnly:  true,
        secure: true,
        sameSite: "strict",
        maxAge: 6 * 24 * 60 * 60
    })

    //refresh token, store in db
    exisitingUser.refreshToken = refreshToken;
    await exisitingUser.save({validateBeforeSave: false});
    const newToken = await exisitingUser.refreshToken
    console.log("resfreshtoken saving", newToken);
    
    console.log("exisitinUser",exisitingUser);
    console.log("cookieStore", cookieStore);
    return Response.json({status: "ok", message: "You have logged in"})
}))