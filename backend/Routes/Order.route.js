import express from "express";
const router = express.Router();
//get all orders
router.get("/", getAllOrders);
//get order by id
router.get("/:id", getOrder);
//create new order
router.post("/", createOrder);
//update order
router.put("/:id", updateOrder);
//delete order
router.delete("/:id", deleteOrder);
//export router
export default router;
