import { pool } from "../../db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function register(req, res) {
    const { username, password } = req.body;
    try {
        const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        if (result.rows.length > 0) {
            return res.status(400).json({
                message: "Username telah ditemukan"
            });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [username, hashPassword]);
            
            return res.status(201).json({
                status: "success",
                message: "Berhasil menambahkan data",
                data: { username }
            });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        if (user.rows.length === 0) {
            return res.status(404).send("User not found.");
        }

        const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid password");
        }

        const token = jwt.sign({
            userId: user.rows[0]._id
        }, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
