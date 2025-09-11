import express from "express";
import cors from "cors";

const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import indexRoutes from "./routes/indexRoutes.js";

app.use("/api/v1/song", indexRoutes)

export {app}