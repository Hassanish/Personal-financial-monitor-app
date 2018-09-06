module.exports = function (sequelize, DataTypes) {
  
  var Expense = sequelize.define("Expense", {
    amount: {
      type: DataTypes.DECIMAL(8, 2),//(100000.25)
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 20],
          msg: "Your item name must be between 2 and 20 characters."
        }
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: "Your category name must be between 2 and 20 characters."
        },
        notEmpty: true,
        isAlpha: true           // will only allow letters and won't allow spaces like swapna kathula
      },
    },
    datePaid: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true            // only allow date string                     

      },
    }
  });

  Expense.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Expense.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }
    return Expense;
 
};