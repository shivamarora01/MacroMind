//we know we gonna need this in every api almost
//so either we create a helper function that checks the token and we call it on top in every api

import { cookies } from "next/headers"
import { APIError } from './APIError.js'
import jwt from "jsonwebtoken"


//either we can create a wrapper for better syntax and cover all api's with that wrapper

//wrapper

export function verifyAuth(handler){
    return async (request) => {
        const cookie = await cookies();
        const token = cookie.get("token")?.value
        if(!token){
            throw new APIError("You are not logged not, pls login!", 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        //decoded contains the payload you signed earlier.
        request.user = decoded;
        return await handler(request);
    }
}