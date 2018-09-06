module.exports = function (sequelize, DataTypes) {
  console.log("User start")
  var User = sequelize.define("User", {

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [3, 20],
          msg: "Your username is not the correct length.  It must be between 3 and 20 characters."
        }
      }

    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [3, 20],
          msg: "Your first name is not the correct length.  It must be between 3 and 20 characters."
        }

      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [3, 20],
          msg: "Your last name is not the correct length.  It must be between 3 and 20 characters."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: "Your password length must be at least 6 characters and no more than 10 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: {
          args: [3, 255],
          msg: "Your email is not the correct length. "
        }

      }
    },
    cellPhone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [10],
          msg: "phone number must be 10 digits"
        }
      }
    }
  });
  

  User.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Expense, {
      onDelete: "cascade"
    });
   /* User.hasMany(models.Investment, {
      onDelete: "cascade"
    });*/
    User.hasMany(models.Alert, {
      onDelete: "cascade"
    });
  };
  console.log("User End")

  return User;
};
