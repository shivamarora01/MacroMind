import errorResponse from "./errorResponse";
import winston from "winston";

const logger = winston.createLogger({
    //format
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    //transporter
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logger.js"})
    ]
})

export function withErrorWrapper(handler){
    return async(req) => {
        try {
            return await handler(req);
        } catch (error) {
            logger.error(error.stack);
            if(error.message == "invalid token"){
                return errorResponse(
                error.message || "Internal server error",
                error.statusCode || 401
                )
            }
            return errorResponse(
                error.message || "Internal server error",
                error.statusCode || 500
            )
        }
    };
}
// creating wrapper so we can handle error in formatting 
// tryCatch, once code throws error in try block, next all execution stops, the control goes to catch block
// APIerror file is a custom error class that allows us to attach HTTP statusCode to an error
// we use new so it can create a new instance of that object
