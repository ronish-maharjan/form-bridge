import express from "express";
import cors from "cors";
import { env } from "./configs/env.js";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:4000",
  methods: ["GET", "POST"],
  credentials:true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(env.PORT, () => {
  console.log("Listening on", env.PORT);
});
