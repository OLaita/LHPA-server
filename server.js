const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const path = __dirname + '/app/views/';

const app = express();

// app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  initial();
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// app.get('/', function (req,res) {
//   res.sendFile(path + "index.html");
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to LHPA application." });
});

require("./app/routes/premios.routes")(app);
require("./app/routes/participantes.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});