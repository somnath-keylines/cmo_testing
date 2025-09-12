
import { Router } from "express";
import  { cmoAdd, cmoFetch } from "../controllers/cmo.controller.js";
import { authenticateToken } from "../middlewares/Auth.middlewares.js";


const router = Router();


router.route("/cmo-fetch").get(cmoFetch)
router.route("/cmo-add").post(authenticateToken, cmoAdd)



export default router;
