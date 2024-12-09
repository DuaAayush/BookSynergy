const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mailer'); // Import the mailer utility

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found!" });
        }
        if (admin.password !== password) {
            return res.status(401).send({ message: "Invalid password!" });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send email on successful login
        sendMail(admin.email, 'Admin Login Successful', 'You have successfully logged in as admin.');

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Failed to login as admin", error);
        res.status(401).send({ message: "Failed to login as admin" });
    }
});

module.exports = router;