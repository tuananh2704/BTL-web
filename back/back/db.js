const mysql = require("mysql2");

// Kết nối MySQL Workbench: Local instance MySQL92 (localhost:3306)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tuananh27@",  // mật khẩu MySQL của bạn
  database: "ql_cuahang",   // tên database
  port: 3306                // CỰC QUAN TRỌNG - phải để đúng port Workbench
});

// Kiểm tra kết nối
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    throw err;
  }
  console.log("MySQL connected!");
});

module.exports = db;
