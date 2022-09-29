const db = require("../models");
const Award = db.premios;
const Op = db.Sequelize.Op;

// Create and Save a new Award
exports.create = (req, res) => {

    // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: req
    });
    return;
  }

  // Create a Award
  const award = {
    title: req.body.title,
    description: req.body.description,
    votos: 0
  };

  // Save Award in the database
  Award.create(award)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Award."
      });
    });
  
};

// Retrieve all Award from the database.
exports.findAll = (req, res) => {

    const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Award.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving awards."
      });
    });
  
};

// Find a single Award with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

  Award.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Award with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Award with id=" + id
      });
    });
  
};

// Update a Award by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

  Award.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Award was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Award with id=${id}. Maybe Award was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Award with id=" + id
      });
    });
  
};

// Delete a Award with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

  Award.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Award was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Award with id=${id}. Maybe Award was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Award with id=" + id
      });
    });
  
};

// Delete all Award from the database.
exports.deleteAll = (req, res) => {

    Award.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Awards were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all awards."
          });
        });
  
};
