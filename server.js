const express = require("express");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./authRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve HTML, CSS, JS from "public" folder
app.use("/api", authRoutes);

// MySQL Connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "", // use your MySQL root password here
//   database: "expense_tracker"
// });

// db.connect((err) => {
//   if (err) {
//     console.error("DB connection failed:", err);
//   } else {
//     console.log("Connected to MySQL database.");
//   }
// });

// ROUTES

// Signup
app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Signup failed" });
    }
});


// Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await db.execute("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];
        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed" });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
