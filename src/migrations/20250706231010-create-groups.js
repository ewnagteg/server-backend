
/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        owner: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        inviteNumber: {
            type: Sequelize.STRING,
        }
    });
}
export async function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Groups');
}
