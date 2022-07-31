const express = require("express");
const movieRoutes = require("./movieRoute");

const routes = (app) => {
    app.route("/s").get((req, res) => {
      res.status(200).send({ title: "Course of node" });
    });
  
    app.use(express.json(), movieRoutes);
  };

module.exports = routes;
