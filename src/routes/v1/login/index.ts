import express, { type Router } from "express";
import { performLogin } from "./controller.ts";

const login: Router = express.Router()

login.post("/", performLogin)

export default login