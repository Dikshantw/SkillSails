import express from "express";

import { Admin, Course } from "./database.js";
import { SECRET, authenticatejwt } from "./authentication.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.get("/me", authenticatejwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();

      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
  Admin.findOne({ username }).then(callback);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticatejwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course Created Successfully" });
});

router.put("/courses/:courseId", authenticatejwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course Updated Successfully" });
  } else {
    res.status(404).json({ message: "Course Not Found" });
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.get("/courses/:courseId", authenticatejwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

export default router;
