import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  photos: {
    type: Image,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Review = model("Review", reviewSchema);
export default Review;
