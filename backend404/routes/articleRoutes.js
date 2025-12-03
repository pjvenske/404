const router = require("express").Router();
const ctrl = require("../controllers/articleController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

// Public routes (Students) - Browse articles
router.get("/category/:category", auth, ctrl.browseByCategory);
router.get("/search", auth, ctrl.searchByKeyword);
router.get("/:id", auth, ctrl.getArticleById);

// Tutor routes - Add or modify articles
router.post("/", auth, roleCheck(["tutor", "admin"]), ctrl.addArticle);
router.put("/:id", auth, roleCheck(["tutor", "admin"]), ctrl.updateArticle);

// Admin routes - Remove articles
router.delete("/:id", auth, roleCheck(["admin"]), ctrl.deleteArticle);

module.exports = router;