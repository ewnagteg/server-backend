import { jest } from '@jest/globals';

// Environment setup

import request from 'supertest';
import app from '../src/server.js';
import db from '../src/database/connection.js';

describe('Player Routes', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 403 when API key is missing', async () => {
        const response = await request(app)
            .post('/api/create-player')
            .send({ players: [{ player_id: 1, name: 'Test', cost: 10 }] });
        
        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
    });

    it('should call db.run to insert players', async () => {
        jest.spyOn(db, 'run').mockImplementation(() => Promise.resolve({}));
        expect(jest.isMockFunction(db.run)).toBe(true);
        const res = await request(app)
            .post('/api/create-player')
            .set('Authorization', `Bearer ${process.env.UPLOAD_API_KEY}`)
            .send({ players: [{ player_id: '1', name: 'Test', cost: 100 }] });
        
        expect(db.run).toHaveBeenCalledWith(
            'INSERT INTO Players (player_id, name, cost) VALUES (?, ?, ?)',
            ['1', 'Test', 100]
        );
        expect(res.statusCode).toBe(200);
    });
});