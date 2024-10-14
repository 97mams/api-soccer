'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.team, {
                foreignKey: "id_team"
            })
            this.hasMany(models.group_type, {
                foreignKey: "id_type"
            })
        }
    }
    return group;
};