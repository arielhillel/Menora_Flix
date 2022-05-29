let newestMovies = require("./../content/newestMovies.js");
let recommendedMovies = require("./../content/recommendedMovies.js");

module.exports = {
  getNewestMovies: (req, res) => {
    res
      .status(200)
      .json(newestMovies)
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },

  getRecommendedMovies: (req, res) => {
    res
      .status(200)
      .json(recommendedMovies)
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
};
