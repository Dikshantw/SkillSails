import express from "express";
import mongoose from "mongoose";
import { User, Admin, Course } from "./database.js";
import { SECRET } from "./authentication.js";
import { authenticatejwt } from "./authentication.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import adminRouter from "./admin.js";
import userRouter from "./user.js";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/users", userRouter);
const databaseUrl = import.meta.env.VITE_URL;

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "courses",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(3000, () => {
  console.log("server running on 3000");
});
