import errorResponse from "./errorResponse";

export function withErrorWrapper(handler){
    return async(req) => {
        try {
            return await handler(req);
        } catch (error) {
            return errorResponse(
                error.message || "Internal server error",
                error.statusCode || 500
            )
        }
    };
}
//creating wrapper so we can handle error in formatting 
// tryCatch, once code throws error in try block, next all execution stops, the control goes to catch block
// APIerror file is a custom error class that allows us to attach HTTP statusCode to an error
// we use new so it can create a new instance of that object
