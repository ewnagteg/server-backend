import { jest } from '@jest/globals';


process.env.UPLOAD_API_KEY = 'test-api-key';


import request from 'supertest';
const { default: app } = await import('../src/server.js');
import Groups from '../src/models/groups.js';
import UserGroup from '../src/models/usergroup.js';


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
});