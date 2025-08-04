import * as playerStatsModel from '../models/playerStatsModel.js';
import cache from '../cache.js';

export async function addPlayerStats(req, res) {
    try {
        const stats = req.body;
        await playerStatsModel.addPlayerStats(stats);
        res.json({ success: true });
    } catch (err) {
        console.error('Failed to fetch players:', err);
        res.status(500).json({ error: 'Failed to add players stats.' });
    }
}

export async function getPlayerStatsTable(req, res) {    
    try {
        const cacheKey = `getPlayerStatsTable`;
        const cached = cache.get(cacheKey);
        if (cached) return res.json(cached);
        
        const stats = await playerStatsModel.getPlayerStatsTable();
        res.json(stats);
    } catch (err) {
        console.error('Failed to fetch players stats:', err);
        res.status(500).json({ error: 'Failed to fetch players stats table.' });
    }
}

export async function getPlayerStats(req, res) { 
    try {
        const { player } = req.params;
        const stats = await playerStatsModel.getPlayerStats(player);
        res.json(stats);
    } catch (err) {
        console.error('Failed to fetch players stats:', err);
        res.status(500).json({ error: 'Failed to fetch players stats.' });
    }
}