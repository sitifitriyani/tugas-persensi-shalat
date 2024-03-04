import express from 'express';
import {
    GetAllStudents,
    AddStudents,
    GetStudentByID,
    UpdateStudents,
    UpdateStudentByID,
    DeleteStudents
} from "../controlers/students.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Get all students
router.get("/api/v1/GetAllStudents", verifyToken, GetAllStudents);
// Add student
router.post("/api/v1/AddStudents", verifyToken, AddStudents);
// Get student by ID
router.get("/api/v1/GetStudentByID/:id", verifyToken, GetStudentByID);
// Update student by ID
router.put("/api/v1/UpdateStudents/:id", verifyToken, UpdateStudents);
// Update present status by ID
router.put("/api/v1/UpdateStudentByID/:id/present", verifyToken, UpdateStudentByID);
// Delete student by ID
router.delete("/api/v1/DeleteStudents/:id", verifyToken, DeleteStudents);

export default router;
