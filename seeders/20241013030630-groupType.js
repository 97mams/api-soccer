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
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name_type: "B",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name_type: "C",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name_type: "D",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('name_types', null, {});
  }
};
