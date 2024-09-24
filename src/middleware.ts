import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    console.log("Middleware triggered");

    const sessionToken = req.cookies.get("next-auth.session-token")?.value;

    // Allow access to any URLs starting with /Room/ without requiring authentication
    if (req.nextUrl.pathname.startsWith("/Room/")) {
        console.log("Room URL detected, bypassing authentication.");
        return NextResponse.next();
    }

    // If no session token exists, redirect to the login page
    if (!sessionToken) {
        console.log("No token, redirecting to login page.");

        const baseUrl = req.nextUrl.origin;  // Get the full base URL dynamically
        if (req.nextUrl.pathname !== "/login") {  // Redirect only if not already on the login page
            return NextResponse.redirect(`${baseUrl}/login`);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
