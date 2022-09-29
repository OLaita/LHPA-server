const db = require("../models");
const Parti = db.participantes;
const Op = db.Sequelize.Op;

// Create and Save a new Parti
exports.create = (req, res) => {

    // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "El campo no puede estar vacío"
    });
    return;
  }

  // Create a Parti
  const parti = {
    nombre: req.body.nombre,
    votado: false
  };

  // Save Parti in the database
  Parti.create(parti)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Parti."
      });
    });
  
};

// Retrieve all Parti from the database.
exports.findAll = (req, res) => {

    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Parti.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving partis."
      });
      
    });
  
};

// Find a single Parti with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

  Parti.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Parti with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Parti with id=" + id
      });
    });
  
};

// Update a Parti by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

  Parti.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Parti was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Parti with id=${id}. Maybe Parti was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Parti with id=" + id
      });
    });
  
};

// Delete a Parti with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

  Parti.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Parti was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Parti with id=${id}. Maybe Parti was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Parti with id=" + id
      });
    });
  
};

// Delete all Parti from the database.
exports.deleteAll = (req, res) => {

    Parti.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Partis were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all partis."
          });
        });
  
};
