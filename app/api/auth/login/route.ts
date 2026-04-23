import { NextResponse } from "next/server"
import { generateToken } from "../../../../lib/auth"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const demoUser = process.env.DEMO_USER
  const demoPass = process.env.DEMO_PASS

  console.log("[auth/login] Login attempt", {
    username,
    hasPassword: Boolean(password)
  })

  if (username !== demoUser || password !== demoPass) {
    console.warn("[auth/login] Invalid credentials", { username })
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = await generateToken(username)
  console.log("[auth/login] Login success", { username })

  return NextResponse.json({ token })
}
