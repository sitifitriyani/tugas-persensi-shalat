import { pool } from "../../db.js";

// Get All students
export async function GetAllStudents(req, res) {
    try {
        const result = await pool.query("SELECT * FROM students WHERE user_id = $1", [req.userId]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Add student
export async function AddStudents(req, res) {
    try {
        const { name, generation, present } = req.body;
        const result = await pool.query(
            "INSERT INTO students (name, generation, present, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, generation, present, req.userId]
        );
        res.json({
            student: result.rows[0],
            message: "Mahasiswa berhasil ditambahkan.",
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get student by ID
export async function GetStudentByID(req, res) {
    try {
        const result = await pool.query("SELECT * FROM students WHERE id = $1 AND user_id = $2", [req.params.id, req.userId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update student by ID
export async function UpdateStudents(req, res) {
    try {
        await pool.query(
            "UPDATE students SET name = $1, generation = $2 WHERE id = $3 AND user_id = $4",
            [req.body.name, req.body.generation, req.params.id, req.userId]
        );
        res.send("Mahasiswa berhasil diedit.");
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update present status by ID
export async function UpdateStudentByID(req, res) {
    try {
        await pool.query("UPDATE students SET present = $1 WHERE id = $2 AND user_id = $3", [req.body.present, req.params.id, req.userId]);
        res.json(req.body.present);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete student by ID
export async function DeleteStudents(req, res) {
    try {
        await pool.query("DELETE FROM students WHERE id = $1 AND user_id = $2", [req.params.id, req.userId]);
        res.send("Mahasiswa berhasil dihapus.");
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
