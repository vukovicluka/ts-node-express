import app from "./app.ts";
import { initDb } from "./db.ts";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await initDb();
  } catch (e) {
    console.error("Database initialization failed", e);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();