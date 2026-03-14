//this is standard error js file
export class APIError extends Error{
    constructor(message, statusCode) {
        super(message),
        this.statusCode = statusCode
    }
}
//this apierror is extending error and we can modify actual http statuscode to our desired one rather than setting all to 500