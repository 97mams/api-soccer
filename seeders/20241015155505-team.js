'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let teams = []
    for (let index = 0; index < 18; index++) {
      teams.push({
        name: "FTA" + index,
        wins: 0,
        losses: 0,
        draws: 0,
        point: 0,
        match: 0,
        createdAt: new Date,
        updatedAt: new Date,
      })
    }
    await queryInterface.bulkInsert('Teams', teams, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Teams', null, {});
  }
};
