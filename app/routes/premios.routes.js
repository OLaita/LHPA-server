module.exports = app => {
    const awards = require("../controllers/premios.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Award
    router.post("/", awards.create);
  
    // Retrieve all Awards
    router.get("/", awards.findAll);
    
    // Retrieve a single Award with id
    router.get("/:id", awards.findOne);
  
    // Update a Award with id
    router.put("/:id", awards.update);
  
    // Delete a Award with id
    router.delete("/:id", awards.delete);
  
    // Delete all Awards
    router.delete("/", awards.deleteAll);
  
    app.use('/api/awards', router);
  };