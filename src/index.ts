import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import router from "./router";
import errorMiddleware from "./middleware/error";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Server has been started on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        prisma.$disconnect();
    }
};

app.get("/", (req, res) => {
    res.send("hello world");
});

start();
