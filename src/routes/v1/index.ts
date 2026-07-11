import { Router } from "express";
import cors from "cors";
import { privateRouter } from "./private.routes.js";
import { publicRouter } from "./public.routes.js";

const v1Router = Router();

const publicCors = cors({
  origin: true,
  methods: ["GET", "POST"],
});

const privateCors = cors({
  origin: "http://localhost:5173",
  credentials: true,
});


v1Router.use("/public",publicCors, publicRouter);
v1Router.use(privateCors, privateRouter);

export { v1Router }
