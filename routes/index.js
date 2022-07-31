const express = require("express");
const movieRoutes = require("./movieRoute");
const nodeMailer = require("nodemailer");

const routes = (app) => {
  app.route("/s").get((req, res) => {
    res.status(200).send({ title: "Course of node" });
  });

  app.post("/send-email", function (req, res) {
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "viniciustatuta@gmail.com",
        pass: "",
      },
    });
    let mailOptions = {
      from: '"Krunal Lathiya" <viniciustatuta@gmail.com>', // sender address
      to: "marcosstatuta@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.body, // plain text body
      html: "<b>NodeJS Email Tutorial</b>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
      res.render("index");
    });
  });

  app.use(express.json(), movieRoutes);
};

module.exports = routes;
