
import { Router } from "express";
import  { cmoAdd, cmoFetch } from "../controllers/cmo.controller.js";
import  { songAdd, songFetch } from "../controllers/song.controller.js";

const router = Router();

router.get("/cmoAdd", cmoFetch);
router.post("/cmoAdd", cmoAdd);
router.get("/songAdd", songFetch);
router.post("/songAdd", songAdd);

export default router;
