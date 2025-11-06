import { createHash } from "node:crypto"
import pg from "pg"

const { Pool } = pg

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/expressdb"
})

async function createSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
  `)
}

async function seedUsers() {
  const users = [
    { username: 'alice', email: 'alice@example.com', password: 'password123' },
    { username: 'bob', email: 'bob@example.com', password: 'password123' },
    { username: 'charlie', email: 'charlie@example.com', password: 'password123' },
  ]

  for (const user of users) {
    const passwordHash = createHash('sha256').update(user.password).digest('hex')
    await pool.query(
      `INSERT INTO users(id, username, email, password_hash)
       VALUES(gen_random_uuid(), $1, $2, $3)
       ON CONFLICT (username) DO NOTHING`,
      [user.username, user.email, passwordHash]
    )
  }
}

export async function initDb(options: { seed?: boolean } = {}) {
  const shouldSeed = options.seed ?? process.env.NODE_ENV === "development"
  console.log("Initializing database", { env: process.env.NODE_ENV, seed: shouldSeed })
  await createSchema()
  if (shouldSeed) {
    await seedUsers()
    console.log("Seeding complete!")
  }
}

export default pool