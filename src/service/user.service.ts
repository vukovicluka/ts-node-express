import pool from "../db.ts";
import type { User } from "../types/user.ts";

export async function findUserByEmail(email: string): Promise<User> {
  try {
    const result = await pool.query("SELECT id, email, username, password_hash FROM users WHERE email=$1 LIMIT 1", [email]);
    return result.rows[0] ?? null;
  } catch (error) {
    throw error
  }
}