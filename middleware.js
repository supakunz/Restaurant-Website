// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/food", request.url));
  }

  return NextResponse.next();
}

// ใช้ matcher เพื่อระบุ path ที่ middleware จะทำงาน
export const config = {
  matcher: ["/"],
};
