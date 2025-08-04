
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
        match_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'match_info',
                key: 'match_id'
            },
            onDelete: 'CASCADE'
        },
        player_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Players',
                key: 'player_id'
            },
            onDelete: 'CASCADE'
        },
        kills: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
}
