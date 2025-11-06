import express, { type Request, type Response, type Express } from "express";
import { login } from "./service/login.service.ts";
import "./db.ts"

const app: Express = express();

app.use(express.json())

app.get("/", (_req: Request, res: Response) => {
  res.send("Node Express server");
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const result = await login(email, password)

    if (!result) {
      return res.status(401).json({error: "Invalid credentials"})
    }

    res.json(result)

  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
})

export default app;