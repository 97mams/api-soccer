'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TeamGroup extends Model {
        static associate(models) {
            // Les associations seront définies ici
            TeamGroup.belongsTo(models.Team, {
                foreignKey: 'teamId',
                as: 'Teams'
            });
            TeamGroup.belongsTo(models.group_type, {
                foreignKey: 'groupTypeId',
                as: 'groupTypes'
            });
        }
    }

    TeamGroup.init({
        teamId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Teams',
                key: 'id'
            }
        },
        groupTypeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'group_types',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'TeamGroup',
    });

    return TeamGroup;
};
