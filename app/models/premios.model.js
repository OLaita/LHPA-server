module.exports = (sequelize, Sequelize) => {
    const Premio = sequelize.define("premio", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      votos: {
        type: Sequelize.INTEGER
      }
    },
    { timestamps: false });
  
    return Premio;
  };