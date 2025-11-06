import express, { type Request, type Response, type Express } from "express";
import v1 from "./routes/v1/index.ts";

const app: Express = express();

app.use(express.json())

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true })
});

app.use("/v1", v1)

export default app;