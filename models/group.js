'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Team.init({
        idTeam: {
            name_type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Teams',
                key: 'id'
            },
            field: 'id_team',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            unique: true
        },
        idType: {
            name_type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'group_types',
                key: 'id'
            },
            field: 'id_type',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            unique: true
        },
    }, {
        sequelize,
        modelName: 'group',
    });
    return Group;
};