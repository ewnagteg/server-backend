import UserGroup from '../models/usergroup.js';
import Groups from '../models/groups.js';
import '../models/associations.js';
import config from '../config/index.js';
import { User } from '@auth0/auth0-react';

export async function createGroup(req, res) {
    try {
        const userId = req.auth.sub;
        const { name } = req.body;
        const inviteNumber = Date.now().toString();
        const joined = await UserGroup.findAll({ where: { userid: userId } });
        if (joined.length > config.vl.maxGroups) {
            res.status(403).json({ success: false, error: "Cant join group, at max" });
            return;
        }

        const group = await Groups.create({
            owner: userId,
            name: name ? name : "",
            inviteNumber: inviteNumber
        });

        await UserGroup.create({ userid: userId, groupid: group.id });

        res.json({ success: true, groupId: group.id, inviteNumber });
    } catch (err) {
        console.error('Failed to create group:', err);
        res.status(500).json({ error: 'Failed to create group.' });
    }
}

export async function joinGroup(req, res) {
    try {
        const userId = req.auth.sub;
        const { invite, groupId } = req.body;
        const data = await Groups.findOne({ where: { id: groupId } });

        if (!data) {
            return res.status(404).json({ success: false, error: "Group not found" });
        }

        // vuln to timing attack, may fix later
        if (data.inviteNumber === invite) {
            const joined = await UserGroup.findAll({ where: { userid: userId } });
            if (joined.length <= config.vl.maxGroups) {
                await UserGroup.create({ userid: userId, groupid: groupId });
                res.json({ success: true });
            } else {
                res.status(403).json({ success: false, error: "Cant join group, at max" });
            }
        } else {
            res.status(403).json({ success: false, error: "Incorrect group invite" });
        }
    } catch (err) {
        console.error('Failed to join group:', err);
        res.status(500).json({ error: 'Failed to join group' });
    }
}

export async function leaveGroup(req, res) {
    try {
        const userId = req.auth.sub;
        const { groupId } = req.body;

        if (!groupId) {
            return res.status(404).json({ success: false, error: "Invalid groupId" });
        }
        const rows = await UserGroup.destroy({ where: { userid: userId, groupid: groupId } });

        res.json({ success: true, rows: rows });
    } catch (err) {
        console.error('Failed to delete group:', err);
        res.status(500).json({ error: 'Failed to delete group' });
    }
}

export async function deleteGroup(req, res) {
    try {
        const userId = req.auth.sub;
        const { groupId } = req.body;

        if (!groupId) {
            return res.status(404).json({ success: false, error: "Invalid groupId" });
        }
        
        const rows = await Groups.destroy({ where: { owner: userId, id: groupId } });

        if (rows > 0) {
            await UserGroup.destroy({ where: { groupid: groupId } });
        }
        res.json({ success: true });

    } catch (err) {
        console.error('Failed to delete group:', err);
        res.status(500).json({ error: 'Failed to delete group' });
    }
}

export async function setGroupName(req, res) {
    try {
        const userId = req.auth.sub;
        const { name, groupId } = req.body;

        const group = await Groups.findOne({ where: { id: groupId } });
        if (!group) {
            return res.status(404).json({ success: false, error: "Group not found" });
        }

        if (group.owner !== userId) {
            return res.status(403).json({ success: false, error: "Unauthorized" });
        }

        const rows = await Groups.update(
            { name },
            { where: { id: groupId } }
        );

        res.json({ success: true, rows: rows });

    } catch (err) {
        console.error('Failed to delete group:', err);
        res.status(500).json({ error: 'Failed to delete group' });
    }
}

export async function getUserGroup(req, res) {
    try {
        const userId = req.auth.sub;

        const userGroups = await UserGroup.findAll({
            where: { userid: userId },
            include: {
                model: Groups,
                as: 'Group',
            },
        });

        if (!userGroups) {
            return res.json({ success: true, group: null });
        }

        const groups = userGroups.map((entry) => entry.Group);

        res.json({
            success: true,
            groups,
        });
    } catch (err) {
        console.error('Failed to get user groups:', err);
        res.status(500).json({ error: 'Failed to get user groups' });
    }
}