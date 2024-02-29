const { Sequelize } = require("sequelize");
const db = require("../db");
// const Student = require("./Student");
// const Programme = require("./Programme");

const AwardedDegree = db.define("awardedDegree", {
  dateawarded: {
    allowNull: false,
    type: Sequelize.DATE,
  }

});
// AwardedDegree.belongsTo(Student, {
//   foreignKey: 'studentId',
//   allowNull: false
// });
// AwardedDegree.belongsTo(Programme, {
//   foreignKey: 'programmeId',
//   allowNull: false
// });

module.exports = AwardedDegree;
