'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TeamGroups', [{
      teamId: 1,
      groupTypeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      teamId: 5,
      groupTypeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      teamId: 2,
      groupTypeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TeamGroups', null, {})
  }
};
