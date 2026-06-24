//1. Steps
//1. get refresh token
//2.
//3. remove refresh token from db
//4. remove both from cookies

import { cookies } from "next/headers"
import { connectDB } from "../../../lib/connectDB";
import { APIError } from "../../../lib/APIError";
import Register from "../../../models/register";
import jwt from "jsonwebtoken";
const SECRET_KEY_REFRESH = process.env.JWT_SECRET_REFRESH;

export async function POST() {
    await connectDB();
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if(refreshToken){
        try {
            const decoded = jwt.verify(
                refreshToken, SECRET_KEY_REFRESH
            )
            await Register.findOneAndUpdate(
                decoded.userId,
                {
                    refreshToken: null
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");

    return Response.json({
        success: true,
        message:"you have been successfully logged out"
})
}