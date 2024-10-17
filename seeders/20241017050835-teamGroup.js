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
      teamId: 3,
      groupTypeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      teamId: 4,
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
