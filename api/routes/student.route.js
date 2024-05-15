import express from "express";
import {
  createStudentEntry,
  getAllStudentEntry,
  updateStudentEntry,
  deleteStudentEntry,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/createEntry", createStudentEntry);
router.get("/getAllEntry", getAllStudentEntry);
router.patch("/updateEntry/:id", updateStudentEntry);
router.delete("/deleteEntry/:id", deleteStudentEntry);

export default router;
