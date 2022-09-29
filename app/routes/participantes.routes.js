module.exports = app => {
    const partis = require("../controllers/participantes.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Award
    router.post("/", partis.create);
  
    // Retrieve all Awards
    router.get("/", partis.findAll);
    
    // Retrieve a single Award with id
    router.get("/:id", partis.findOne);
  
    // Update a Award with id
    router.put("/:id", partis.update);
  
    // Delete a Award with id
    router.delete("/:id", partis.delete);
  
    // Delete all Awards
    router.delete("/", partis.deleteAll);
  
    app.use('/api/partis', router);
  };