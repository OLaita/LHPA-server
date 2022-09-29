module.exports = (sequelize, Sequelize) => {
    const Participante = sequelize.define("participante", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      votado: {
        type: 'BOOLEAN',
        defaultValue: false
      },
      updatedAt: {
        type: "TIMESTAMP"
      },
    },
    { timestamps: false });
  
    return Participante;
  };