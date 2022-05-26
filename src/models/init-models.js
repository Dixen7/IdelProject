const DataTypes = require("sequelize").DataTypes;
const _user = require("./user");
const _mission = require("./mission");

function initModels(sequelize) {
  const user = _user(sequelize, DataTypes);
  const mission = _mission(sequelize, DataTypes);


  return {
    user,
    mission
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
