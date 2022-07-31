const Movie = require("../model/Movie");
const movieDao = require("../service/movieDao");

var movieController = {
  addMovie: addMovie,
  findMovies: findMovies,
  findMovieById: findMovieById,
  updateMovie: updateMovie,
  deleteById: deleteById,
  findMovieByTitle: findMovieByTitle,
};

function addMovie(req, res) {
  let movie = req.body;
  movieDao
    .create(movie)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findMovieById(req, res) {
  movieDao
    .findById(req.params.id)
    .then((data) => {
      if (data != null) {
        res.send(data);
      } else {
        res.status(404).json({ message: "Movie is not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function findMovieByTitle(req, res) {
  try {
    const { title } = req.params;

    const movie = await movieDao.findByTitle(title);

    return res.status(302).json(movie);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

function deleteById(req, res) {
  movieDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "Movie deleted successfully",
        movie: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateMovie(req, res) {
  movieDao
    .updateMovie(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "Message updated sucessfully",
        movie: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function findMovies(req, res) {
  var count = 1;
  const { title } = req.query;
  const { date_from } = req.query;
  const { date_to } = req.query;

  if (title != null) {
    const movie = await movieDao.findByTitle(title);

    return res.status(302).json(movie);
  } else if ((date_from != null) & (date_to != null)) {
    const movie = await movieDao.findByDate(date_from, date_to);

    return res.status(302).json(movie);
  } else {
    const movies = await movieDao.findAll();

    res.status(200).json({ data: movies, count: count });
  }
}

module.exports = movieController;
