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
app.use(express.urlencoded({ extended: true }));

import cmoRoutes from "./routes/cmo.route.js";
import userRouter  from "./routes/user.route.js"
import songRoute from "./routes/song.routes.js"
import orderRoutr from "./routes/order.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/cmo", cmoRoutes)
app.use("/api/v1/song",songRoute)
app.use("/api/v1/order",orderRoutr)

export {app}