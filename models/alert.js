module.exports = function (sequelize, DataTypes) {
  console.log("alert start")
  var Alert = sequelize.define("Alert", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true

      },
      alertType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true

        },
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 255],
          notEmpty: true

        },
      }
    }
  });

  Alert.associate = function (models) {

    Alert.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  console.log("alert end")
  return Alert;
};
