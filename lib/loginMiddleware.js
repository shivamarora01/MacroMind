import { APIError } from "./APIError";
import {loginSchema} from "../schemas/login.schema"

export function validateLogin(handler) {
    return async (request) => {
        const body = await request.json();
        const result = loginSchema.safeParse(body);
        if(!result.success){
            throw new APIError("Email is wrong OR Password should have atleast 4 characters", 400);
        }
        request.validatedBody = result.data;
        return handler(request);
    }
}
//add zod middlware for validation body