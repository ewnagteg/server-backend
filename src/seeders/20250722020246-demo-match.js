'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    
    
    await queryInterface.bulkInsert('match_info', [
        {
            match_id: 1,
            match_date: 1,
            team1: 'G2',
            team2: 'Sentinels',
        }
    ]);

    await queryInterface.bulkInsert('Players', [
        {
            player_id: 1,
            name: 'leaf',
            cost: 6
        },
        {
            player_id: 2,
            name: 'babybay',
            cost: 5
        },
    ]);

    await queryInterface.bulkInsert('matches', [
        {
            player_id: 1,
            match_id: 1,
            kills: 6
        },
        {
            player_id: 2,
            match_id: 1,
            kills: 5
        },
    ]);
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('match_info', null, {});
    await queryInterface.bulkDelete('Players', null, {});
    await queryInterface.bulkDelete('matches', null, {});
}
