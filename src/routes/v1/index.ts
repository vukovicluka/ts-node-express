import express, { type Router } from "express";
import login from "./login/index.ts";

const v1: Router = express.Router()

v1.use("/login", login)

export default v1