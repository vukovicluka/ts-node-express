import { createHash } from "node:crypto"
import { findUserByEmail } from "./user.service.ts"
import jwt from "jsonwebtoken";

export async function login(email: string, password: string) {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isValidPassword = await checkPasswordHash(password, user.password_hash)
  if (!isValidPassword) {
    throw new Error("Invalid credentials")
  }

  const token = signJWT({ userId: user.id, email: user.email })

  return {
    userId: user.id,
    email: user.email,
    username: user.username,
    token
  }
}

async function checkPasswordHash(plainPassword: string, storedHash: string) {
  const passwordHash = hashPassword(plainPassword)
  return passwordHash === storedHash
}

function hashPassword(password: string) {
  return createHash('sha256').update(password).digest('hex')
}

function signJWT(payload: any) {
  const secret = process.env.JWT_SECRET || "secret_key"
  return jwt.sign(payload, secret, { expiresIn: "1h" })
}

