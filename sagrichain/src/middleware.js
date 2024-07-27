import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Log the incoming request pathname
  console.log("Incoming request:", pathname);

  if (
    pathname.startsWith("/farmer") ||
    pathname.startsWith("/distributor") ||
    pathname.startsWith("/wholesaler") ||
    pathname.startsWith("/retailer") ||
    pathname.startsWith("/market")
  ) {
    const token = req.cookies.get("token"); // Fetch token from cookies
    const role = req.cookies.get("role"); // Fetch role from cookies
    const address = req.cookies.get("address"); // Fetch address from cookies

    // // Log token, role, and address retrieval
    // console.log("Token from cookies:", token);
    // console.log("Role from cookies:", role);
    // console.log("Address from cookies:", address);

    if (!token) {
      console.log("No token found, redirecting to login");
      const loginUrl = new URL("/login", req.nextUrl.origin).toString();
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
