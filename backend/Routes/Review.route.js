import express from "express";
const router = express.Router();
//get all reviews
router.get("/", getAllReviews);
//get review by id
router.get("/:id", getReview);
//create new review
router.post("/", createReview);
//update review
router.put("/:id", updateReview);
//delete review
router.delete("/:id", deleteReview);
//export router
export default router;
