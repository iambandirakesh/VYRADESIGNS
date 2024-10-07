import exprees from "express";
import dotenv from "dotenv";
import ConnectDB from "./Database/Database.js";
import categoryRouter from "./Routes/Category.route.js";
import productRouter from "./Routes/Product.route.js";
import cors from "cors";
import userRouter from "./Routes/User.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = exprees();
app.use(
  cors({ origin: "https://vyradesigns.onrender.com/", credentials: true })
);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(exprees.json());
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  ConnectDB();
});
