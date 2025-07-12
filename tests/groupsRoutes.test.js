import { expect, jest } from '@jest/globals';


process.env.UPLOAD_API_KEY = 'test-api-key';


import request from 'supertest';
const { default: app } = await import('../src/server.js');
import Groups from '../src/models/groups.js';
import UserGroup from '../src/models/usergroup.js';
import '../src/models/associations.js';
import sequelize from '../src/database/sequelize.js';

describe('Group Routes', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.mock('../src/middleware/auth.js', () => ({
            checkJwt: jest.fn((req, res, next) => {
                req.auth = { sub: 'mock-user-id' };
                next();
            }),
        }));
    });

    it('should create a new group and return invite number', async () => {
        const fakeGroup = {
            id: 1,
            owner: 'auth0|abc123',
            name: 'Test Group',
            inviteNumber: '1234567890',
        };

        jest.spyOn(Groups, 'create').mockResolvedValue(fakeGroup);

        Groups.create.mockResolvedValue(fakeGroup);

        const response = await request(app)
            .post('/api/groups/create')
            .send({ name: 'Test Group' });
        expect(response.statusCode).toBe(200);
        expect(Groups.create).toHaveBeenCalledWith(
            expect.objectContaining({
                owner: expect.any(String),
                name: expect.any(String),
                inviteNumber: expect.any(String),
            })
        );
        expect(response.body).toHaveProperty('inviteNumber');
    });

    it('should join a group by groupid', async () => {
        jest.spyOn(UserGroup, 'create').mockResolvedValue({});

        const response = await request(app)
            .post('/api/groups/join')
            .send({ groupid: 1 });

        expect(response.statusCode).toBe(200);
        expect(UserGroup.create).toHaveBeenCalledWith({
            userid: expect.any(String),
            groupid: 1,
        });
    });

    it('should get a group by userid', async () => {
        // we mocked checkJwt so itll return a mock user id which should be seeded in db
        const response = await request(app)
            .get('/api/groups/get')
            .send();

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "group": {
                "id": 1,
                "inviteNumber": "1234567890",
                "name": "Test Group 1",
                "owner": "user123",
            },
            success: true,
        });
    });
});