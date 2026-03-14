import { NextResponse } from "next/server";
//NextResponse is a class in Next.js used to create or modify HTTP responses, especially in middleware, route handlers, and Edge functions. It extends the standard Web Response API but adds extra Next.js features like redirects, rewrites, cookies, and headers.

export function middleware(request){
    const token = request.cookies.get("token");
    if(!token){
        //Redirect a user - Used when authentication fails.
        return NextResponse.redirect(new URL("/login", request.url));
    }
    //NextResponse.next() → allows the request to continue to the next route/page.
    return NextResponse.next();
}
//in export const config → matcher, you specify the routes where the middleware should run, which usually means the routes you want to secure or protect.
export const config= {
    matcher: ["/macros/today"],
}