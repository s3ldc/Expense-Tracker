const mysql = require("mysql2");

// Create a MySQL connection pool (better for scalability)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "tiger", // update with your actual MySQL password
  database: "ExpenseTracker",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export promise-based version for async/await usage
const db = pool.promise();

module.exports = db;
