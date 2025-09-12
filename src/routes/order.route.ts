import { Router } from "express";
import { getAllOrders, getOrderHistory, placeOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { authenticateToken } from "../middlewares/Auth.middlewares.js";

const router = Router();

router.route("/place-order").post(authenticateToken,placeOrder)
router.route("/order-history").get(authenticateToken,getOrderHistory)
router.route("/all-order").get(authenticateToken,getAllOrders)
router.route("/:orderId/status").patch(authenticateToken,updateOrderStatus)


export default router