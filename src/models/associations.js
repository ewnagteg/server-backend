import UserGroup from './usergroup.js';
import Groups from './groups.js';

UserGroup.belongsTo(Groups, { 
  foreignKey: 'groupid',
  as: 'Group' 
});

Groups.hasMany(UserGroup, { 
  foreignKey: 'groupid',
  as: 'UserGroups' 
});

export { UserGroup, Groups };