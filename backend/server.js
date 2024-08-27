import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
//configure env
dotenv.config();

const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to InstaMart  API service</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
    );
});
