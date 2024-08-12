const { Sequelize } = require("sequelize");
const db = require("../db");
// const Programme = require("./Programme");
// const Type = require("./Type");
const ElectiveRequirement = db.define("electiveRequirement", {
  amount: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  // programmeId: {
  //   type: Sequelize.INTEGER,
  //   // references: {
  //   //   model: Programme,
  //   //   key: 'id'
  //   // }
  // },
  // typeId: {
  //   type: Sequelize.INTEGER,
  //   // references: {
  //   //   model: Type,
  //   //   key: 'id'
  //   // }
  // }

});
// ElectiveRequirement.belongsTo(Programme, {
//   foreignKey: 'programmeId',
//   allowNull: false
// });
// ElectiveRequirement.belongsTo(Type, {
//   foreignKey: 'typeId',
//   allowNull: false
// });
module.exports = ElectiveRequirement;