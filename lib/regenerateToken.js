import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import Register from "../models/register"
import { APIError } from "./APIError";
const SECRET_KEY_ACCESS = process.env.JWT_SECRET;
const SECRET_KEY = process.env.JWT_SECRET_REFRESH;

//Steps
//1. check if access token is present
//2. if yes, do nothing
//3. if no, check refresh Token
//4. if refreshToken is there present
//5. match it with the refreshtoken in db
//6. if mtaches, generate a access token


export async function regenerateToken(){
    const cookie = await cookies();
    const accessToken = cookie.get("token")?.value;
    // if(accessToken != ''){
    //     return;
    // }
    const refreshToken = cookie.get("refreshToken")?.value;
    // if(refreshToken == ''){
    //     return;
    // }
    const decoded = jwt.verify(refreshToken, SECRET_KEY);
    console.log("decoded version", decoded);
    const userId = decoded.userId;
    const email = decoded.email;
    const existingUser = await Register.findById(userId);
    console.log("exisisting user we found", existingUser);
    const refreshTokenFromDB = existingUser.refreshToken;
    if(refreshTokenFromDB === refreshToken){
        const token = jwt.sign(
            {userId, email},
            SECRET_KEY_ACCESS,
            {expiresIn: "15m"}
        )
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60*60
        })
        return token;
    }
}
