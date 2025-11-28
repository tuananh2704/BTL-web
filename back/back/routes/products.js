var express = require("express");
var router = express.Router();
var db = require("../db");

// Lấy tất cả sản phẩm
router.get("/", function (req, res) {
  const sql = "SELECT * FROM mathang";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ msg: "Lỗi server!" });
    }

    res.json(results);
  });
});

module.exports = router;
