import express from "express";
import authRoute from "./routes/auth.routes.js";
import productRoute from "./routes/product.routes.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
export default app;