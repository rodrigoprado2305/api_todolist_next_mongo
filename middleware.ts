import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api/todos")
    || req.nextUrl.pathname.startsWith("/tasks")
  ) {
    const authorization = req.headers.get("authorization") ?? ""
    const bearerMatch = authorization.match(/^Bearer\s+(.+)$/i)
    const token = bearerMatch?.[1]?.trim() || authorization.trim()

    if (!token || !(await verifyToken(token))) {
      console.warn("[auth/middleware] Unauthorized request", {
        path: req.nextUrl.pathname,
        hasAuthorizationHeader: Boolean(authorization),
        authorizationPrefix: authorization.split(" ")[0] || null
      })
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}
