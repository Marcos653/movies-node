const Movie = require("../model/Movie");
const { Op } = require("sequelize");


var movieDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateMovie: updateMovie,
  findByTitle: findByTitle,
  findByDate: findByDate,
};

async function findAll() {
  return Movie.findAll();
}

function findById(id) {
  return Movie.findByPk(id);
}

function findByTitle(title) {
  return Movie.findAll({
    where: {
      title: {
        [Op.like]: ["%" + title + "%"],
      },
    },
  });
}

function findByDate(date_from, date_to) {
  return Movie.findAll({
    where: {
      createdAt: {
        [Op.between]: [date_from, date_to],
      },
    },
  });
}

function deleteById(id) {
  return Movie.destroy({ where: { id: id } });
}

function create(movie) {
  var newMovie = new Movie(movie);
  return newMovie.save();
}

function updateMovie(movie, id) {
  var updateMovie = {
    title: movie.title,
    description: movie.description,
    author: movie.author,
  };
  return Movie.update(updateMovie, { where: { id: id } });
}




module.exports = movieDao;
