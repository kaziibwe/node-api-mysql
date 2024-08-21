import mysql from 'mysql2';

// Connecting Database
const connection = mysql.createPool({
    host: "localhost",
    user: "alfred",
    password: "Ka075.",
    database: "nodedb",
});

export const getall = async (req, res) => {
    try {
        const [data] = await connection.promise().query(`SELECT * FROM users;`);
        res.status(200).json({
            users: data,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const post = async (req, res) => {
    try {
        const { name, address, country } = req.body;
        const [{ insertId }] = await connection.promise().query(
            `INSERT INTO users (name, address, country) VALUES (?, ?, ?)`,
            [name, address, country]
        );
        res.status(201).json({
            message: "User Created",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const getSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const [data] = await connection.promise().query(
            `SELECT * FROM users WHERE id = ?`, [id]
        );
        res.status(200).json({
            user: data[0],
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, country } = req.body;
        await connection.promise().query(
            `UPDATE users SET name = ?, address = ?, country = ? WHERE id = ?`,
            [name, address, country, id]
        );
        res.status(200).json({
            message: "User Updated",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await connection.promise().query(
            `DELETE FROM users WHERE id = ?`,
            [id]
        );
        res.status(200).json({
            message: "User Deleted",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
