import express, { type Request, type Response, type Express } from "express";
import { login } from "../../../service/login.service.ts";

export async function performLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const result = await login(email, password)

    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    res.json(result)

  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
}