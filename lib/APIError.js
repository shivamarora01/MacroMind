//this is standard error js file
export class APIError extends Error{
    constructor(message, statusCode = 500) {
        super(message);
        this.name="APIError";
        this.statusCode = statusCode;
    }
}
// ⚡ Why super() is REQUIRED

// In JavaScript:

// 👉 You cannot use this in child class until super() is called

//Why do we use super in custom error class?”

// Answer:

// “To initialize the base Error class so we get message, stack trace, and proper error behavior.”
//this apierror is extending error and we can modify actual http statuscode to our desired one rather than setting all to 500