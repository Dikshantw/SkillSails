import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./admin.js";
import userRouter from "./user.js";
import dotenv from "dotenv";

const app = express();
dotenv.config().parsed;
app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/users", userRouter);
const databaseUrl = process.env.MONGO_URI;

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("server running on 3000");
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
