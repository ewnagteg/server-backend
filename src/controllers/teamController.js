import * as teamService from '../services/teamService.js';
import * as teamModel from '../models/teamModel.js';

export async function addPlayer(req, res) {
    const userId = req.auth.sub;
    const { player_id } = req.body;

    try {
        await teamService.addPlayerToTeam(userId, player_id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deletePlayer(req, res) {
    const userId = req.auth.sub;
    const { player_id } = req.body;
    try {
        await teamModel.deletePlayer(userId, player_id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getTeams(req, res) {
    try {
        const teams = await teamModel.findAll();
        res.json(teams);
    } catch (err) {
        console.error('Failed to fetch players:', err);
        res.status(500).json({ error: 'Failed to fetch players.' });
    }
}

export async function getTeam(req, res) {
    try {
        const userId = req.auth.sub;
        const teams = await teamModel.getTeam(userId);
        res.json(teams);
    } catch (err) {
        console.error('Failed to fetch players:', err);
        res.status(500).json({ error: 'Failed to fetch players.' });
    }
}

export async function getStats(req, res) {
    try {
        const stats = await teamModel.getStats();
        res.json(stats);
    } catch (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getTeamStats(req, res) {
    const userId = req.auth.sub;
    try {
        const stats = await teamModel.getTeamStats(userId);
        res.json(stats);
    } catch (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}