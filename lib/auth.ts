import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET ?? ""
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function generateToken(username: string) {
  return await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (error) {
    console.warn("[auth] Token validation failed", {
      reason: error instanceof Error ? error.message : "unknown"
    })
    return null
  }
}
