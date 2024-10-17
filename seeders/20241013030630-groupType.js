'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('group_types', [{
      name_type: "A",
    }, {
      name_type: "B",
    }, {
      name_type: "C",
    }, {
      name_type: "D",
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('group_types', null, {});
  }
};
