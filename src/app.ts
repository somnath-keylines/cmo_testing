import express from "express"
import cors from "cors";
const app=express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", //use for which websit you allowed to connect to your backend
    credentials: true,
  })
);
app.use(express.json());

import userRouter  from "./routes/user.route.js"

app.use("/api/v1/users",userRouter)

export {app}