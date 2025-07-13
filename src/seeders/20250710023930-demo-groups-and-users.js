'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
        {
            id: 1,
            owner: 'user123',
            name: 'Test Group 1',
            inviteNumber: '1234567890',
        },
        {
            id: 2,
            owner: 'mock-user-id',
            name: 'Test Group 2',
            inviteNumber: '1234567890',
        },
    ]);

    await queryInterface.bulkInsert('UserGroup', [
        {
            userid: 'mock-user-id',
            groupid: 1
        },
        {
            userid: 'user123',
            groupid: 1
        }
    ]);
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserGroup', null, {});
    await queryInterface.bulkDelete('Groups', null, {});
}
