export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGroup', {
        userid: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        groupid: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
    });


    await queryInterface.addConstraint('UserGroup', {
        fields: ['groupid'],
        type: 'foreign key',
        name: 'fk_usergroup_groupid',
        references: {
            table: 'Groups',
            field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    
    await queryInterface.addConstraint('UserGroup', {
        fields: ['userid', 'groupid'],
        type: 'primary key',
        name: 'pk_usergroup_userid_groupid',
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserGroup');
}