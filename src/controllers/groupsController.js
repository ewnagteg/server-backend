import UserGroup from '../models/usergroup.js';
import Groups from '../models/groups.js';
import '../models/associations.js';

export async function createGroup(req, res) {
    try {
        const userId = req.auth.sub;
        const { name } = req.body;
        const inviteNumber = Date.now().toString();
        const group = await Groups.create({
            owner: userId,
            name: name,
            inviteNumber: inviteNumber
        });
        res.json({ success: true, groupId: group.id, inviteNumber });
    } catch (err) {
        console.error('Failed to create group:', err);
        res.status(500).json({ error: 'Failed to create group.' });
    }
}

export async function joinGroup(req, res) {
    try {
        const userId = req.auth.sub;
        const { groupid } = req.body;
        await UserGroup.create({ userid: userId, groupid: groupid });
        res.json({ success: true });
    } catch (err) {
        console.error('Failed to join group:', err);
        res.status(500).json({ error: 'Failed to join group' });
    }
}

export async function getUserGroup(req, res) {
    try {
        const userId = req.auth.sub;
        
        const userGroup = await UserGroup.findOne({
            where: { userid: userId },
            include: {
                model: Groups,
                as: 'Group',
            },
        });
        
        if (!userGroup) {
            return res.json({ success: true, group: null });
        }
        
        res.json({ 
            success: true, 
            group: userGroup.Group
        });
    } catch (err) {
        console.error('Failed to get user group:', err);
        res.status(500).json({ error: 'Failed to get user group' });
    }
}