'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("Players", {
        player_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });
}
export async function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Players');
}
