const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const {
  getNewestMovies,
  getRecommendedMovies,
} = require("../controllers/movies");

router.get("/newest", verifyJWT, getNewestMovies);
router.get("/recommended", verifyJWT, getRecommendedMovies);

module.exports = router;
