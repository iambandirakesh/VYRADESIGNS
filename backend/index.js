import exprees from "express";
import dotenv from "dotenv";
import ConnectDB from "./Database/Database.js";
import categoryRouter from "./Routes/Category.route.js";
import productRouter from "./Routes/Product.route.js";
dotenv.config();
const app = exprees();
app.set("view engine", "ejs");
app.use(exprees.json());
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});
app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
  ConnectDB();
});
