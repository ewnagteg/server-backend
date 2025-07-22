'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("match_info", {
        match_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, // Optional, based on whether match_id is generated
        },
        match_date: {
            type: Sequelize.TEXT, // ISO 8601 format (e.g., "2024-07-16T12:00:00Z")
            allowNull: true,
        },
        team1: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        team2: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    });
}

export async function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('match_info');
}
