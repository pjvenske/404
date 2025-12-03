const db = require("../config/db");

// Browse articles by category (Students, Tutors, Admins)
exports.browseByCategory = (req, res) => {
  const { category } = req.params;

  db.query("CALL BrowseArticlesByCategory(?)", [category], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ articles: results[0] });
  });
};

// Search articles by keyword in title/name (Students, Tutors, Admins)
exports.searchByKeyword = (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword parameter is required" });
  }

  db.query("CALL SearchArticlesByKeyword(?)", [`%${keyword}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ articles: results[0] });
  });
};

// Get single article by ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;

  db.query("CALL GetArticleById(?)", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ article: results[0] });
  });
};

// Add new article (Tutors and Admins)
exports.addArticle = (req, res) => {
  const {
    category,
    type,
    name,
    born,
    died,
    nationality,
    known_for,
    notable_work,
    about,
    year,
    medium,
    dimensions,
    location,
    designed_by,
    developer
  } = req.body;

  const added_by = req.user.id; // id From JWT token

  // Validation
  if (!category || !type || !name) {
    return res.status(400).json({
      message: "Category, type, and name are required fields"
    });
  }

  const values = [
    added_by, category, type, name, born, died,
    nationality, known_for, notable_work, about,
    year, medium, dimensions, location, designed_by, developer
  ];

  db.query("CALL AddArticle(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Article added successfully"
    });
  });
};

// Update article (Tutors and Admins)
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const {
    category,
    type,
    name,
    born,
    died,
    nationality,
    known_for,
    notable_work,
    about,
    year,
    medium,
    dimensions,
    location,
    designed_by,
    developer
  } = req.body;

  // First check if article exists
  const checkSql = `SELECT id FROM articles WHERE id = ?`;

  db.query(checkSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Build dynamic update query based on provided fields
    const updates = [];
    const values = [];

    if (category !== undefined) { updates.push("category = ?"); values.push(category); }
    if (type !== undefined) { updates.push("type = ?"); values.push(type); }
    if (name !== undefined) { updates.push("name = ?"); values.push(name); }
    if (born !== undefined) { updates.push("born = ?"); values.push(born); }
    if (died !== undefined) { updates.push("died = ?"); values.push(died); }
    if (nationality !== undefined) { updates.push("nationality = ?"); values.push(nationality); }
    if (known_for !== undefined) { updates.push("known_for = ?"); values.push(known_for); }
    if (notable_work !== undefined) { updates.push("notable_work = ?"); values.push(notable_work); }
    if (about !== undefined) { updates.push("about = ?"); values.push(about); }
    if (year !== undefined) { updates.push("year = ?"); values.push(year); }
    if (medium !== undefined) { updates.push("medium = ?"); values.push(medium); }
    if (dimensions !== undefined) { updates.push("dimensions = ?"); values.push(dimensions); }
    if (location !== undefined) { updates.push("location = ?"); values.push(location); }
    if (designed_by !== undefined) { updates.push("designed_by = ?"); values.push(designed_by); }
    if (developer !== undefined) { updates.push("developer = ?"); values.push(developer); }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(id); // Add id for WHERE clause

    const updateSql = `UPDATE articles SET ${updates.join(", ")} WHERE id = ?`;

    db.query(updateSql, values, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Article updated successfully",
        affectedRows: result.affectedRows
      });
    });
  });
};

// Delete article (Admins only)
exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  // First check if article exists
  const checkSql = `SELECT id FROM articles WHERE id = ?`;

  db.query(checkSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    db.query("CALL DeleteArticle(?)", [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Article deleted successfully",
        affectedRows: result.affectedRows
      });
    });
  });
};