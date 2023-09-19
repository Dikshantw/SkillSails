import express from "express";
import mongoose from "mongoose";
import { User, Admin, Course } from "./database.js";
import { SECRET, authenticatejwt } from "./authentication.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged In Successfully", token });
  } else {
    res.status(403).json({ message: "User Not Found" });
  }
});

router.get("/courses", authenticatejwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post("/courses/:courseId", authenticatejwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourse.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authenticatejwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourse"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourse });
  } else {
    res.status(403).json({ message: "User not Found" });
  }
});
export default router;
