import { expect, jest } from '@jest/globals';

import request from 'supertest';
const { default: app } = await import('../src/server.js');
import Match from '../src/models/match.js';
import sequelize from '../src/database/sequelize.js';

describe('Match Routes', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.mock('../src/middleware/auth.js', () => ({
            checkJwt: jest.fn((req, res, next) => {
                req.auth = { sub: 'mock-user-id' };
                next();
            }),
        }));
    });

    it('should return requested match', async () => {

        const response = await request(app)
            .get('/api/match/get/1')
            .send();

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty('match');
        expect(response.body.match).toEqual([
            {
                "MatchInfo": {
                    "match_date": "1",
                    "match_id": 1,
                    "team1": "G2",
                    "team2": "Sentinels",
                },
                "kills": 6, "match_id": 1, "player_id": 1
            },
            {
                "MatchInfo": {
                    "match_date": "1",
                    "match_id": 1,
                    "team1": "G2",
                    "team2": "Sentinels",
                },
                "kills": 5, "match_id": 1, "player_id": 2
            }
        ]);
    });

    it('should return all match', async () => {

        const response = await request(app)
            .get('/api/match/getAll')
            .send();

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty('matches');
        expect(response.body.matches).toEqual([
            {
                "MatchInfo": {
                    "match_date": "1",
                    "match_id": 1,
                    "team1": "G2",
                    "team2": "Sentinels",
                },
                "kills": 6, "match_id": 1, "player_id": 1
            },
            {
                "MatchInfo": {
                    "match_date": "1",
                    "match_id": 1,
                    "team1": "G2",
                    "team2": "Sentinels",
                },
                "kills": 5, "match_id": 1, "player_id": 2
            }
        ]);
    });

    it('should return requested player match', async () => {

        const response = await request(app)
            .get('/api/match/getPlayer/1')
            .send();

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty('matches');
        expect(response.body.matches).toEqual([
            { "kills": 6, "match_id": 1, "player_id": 1 }
        ]);
    });
});