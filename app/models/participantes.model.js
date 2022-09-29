module.exports = (sequelize, Sequelize) => {
    const Participante = sequelize.define("participante", {
      nombre: {
        type: Sequelize.STRING
      },
      votado: {
        type: Sequelize.BOOLEAN
      }
    },
    { timestamps: false });
  
    return Participante;
  };