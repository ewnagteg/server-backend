import * as notesModel from '../models/notesModel.js';

export async function addNotes(req, res) {
    try {
        const userId = req.auth.sub;
        const jsonNodes = JSON.stringify(req.body.nodes);
        const jsonEdges = JSON.stringify(req.body.edges);
        await notesModel.addNotes(userId, jsonNodes, jsonEdges);
        res.json({ success: true });
    } catch (err) {
        console.error('Failed to add notes:', err);
        res.status(500).json({ error: 'Failed to add notes.' });
    }
}

export async function getNotes(req, res) {
    try {
        const userId = req.auth.sub;
        const notes = await notesModel.getNotes(userId);
        res.json(notes);
    } catch (err) {
        console.error('Failed to fetch notes:', err);
        res.status(500).json({ error: 'Failed to fetch notes.' });
    }
}