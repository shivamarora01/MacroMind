import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
import { cookies } from 'next/headers'
import { APIError } from './APIError';

export async function getUserIdFromToken(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value
    console.log("token", token);
    if(!token){
        throw new APIError("no token found on helper", 401);
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded token",decoded);
        return decoded;
    } catch (error) {
        throw new APIError("invalid token in helper", 401);
    }
}