'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.group_type, {
        foreignKey: 'id_type'
      })
    }
  }
  group_type.init({
    name_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'group_type',
  });
  return group_type;
};