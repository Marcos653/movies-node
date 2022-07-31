const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieControllers");


router.post("/movie", movieController.addMovie);
router.get("/movie", movieController.findMovies);
// router.get("/movie/pdf", movieController.createPdf);
router.get("/movie/:id", movieController.findMovieById);
router.put("/movie/:id", movieController.updateMovie);
router.delete("/movie/:id", movieController.deleteById);

module.exports = router;
