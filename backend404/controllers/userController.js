const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { username, password, role } = req.body;

  const hashed = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO Users (username, password_hash, role)
               VALUES (?, ?, ?)`;

  db.query(sql, [username, hashed, role], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User registered successfully." });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = ?`;

  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = results[0];

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      "SECRETKEY",
      { expiresIn: "2h" }
    );

    res.json({ token });
  });
};