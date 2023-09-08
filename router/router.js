const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../auth/authenticateToken");
const { Registration } = require("../controller/registration");
const { GetUser, UpdateUser } = require("../controller/profile");
const { AddCategory, GetAllCategories } = require("../controller/categories");
const { AddQuestions, GetAllQuestions } = require("../controller/questions");

router.post("/api/auth/registration", Registration);
router.get("/api/auth/profile/:userId", authenticateToken, GetUser);
router.put("/api/auth/score/:userId", authenticateToken, UpdateUser);
router.post("/api/auth/add-category", authenticateToken, AddCategory);
router.get("/api/auth/categories", authenticateToken, GetAllCategories);
router.post("/api/auth/add-questions", authenticateToken, AddQuestions);
router.get("/api/auth/questions", authenticateToken, GetAllQuestions);

module.exports = router;
