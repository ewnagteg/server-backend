import UserGroup from './usergroup.js';
import Groups from './groups.js';
import Match from './match.js';
import MatchInfo from './matchInfo.js';

UserGroup.belongsTo(Groups, { 
  foreignKey: 'groupid',
  as: 'Group' 
});

Groups.hasMany(UserGroup, { 
  foreignKey: 'groupid',
  as: 'UserGroups' 
});

Match.belongsTo(MatchInfo, { 
    foreignKey: 'match_id', 
    targetKey: 'match_id' 
});

MatchInfo.hasMany(Match, { 
    foreignKey: 'match_id', 
    sourceKey: 'match_id' 
});

export { UserGroup, Groups, Match, MatchInfo };