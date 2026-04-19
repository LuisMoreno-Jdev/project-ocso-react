import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./constants";

export default function middleware(req: NextRequest) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if(req.nextUrl.pathname === "/dashboard") {
        if(!token) {
            return NextResponse.redirect(new URL("/Login", req.nextUrl));
        }
    }
    if(req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    else NextResponse.next();
}
