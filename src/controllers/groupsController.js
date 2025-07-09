import UserGroup from '../models/usergroup.js';
import Groups from '../models/groups.js';


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