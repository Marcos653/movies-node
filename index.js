const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");


const db = require("./config/database");
const routes = require("./routes/index")



db.authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors("*"));
routes(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

db.sync()
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log("Error: " + err));
