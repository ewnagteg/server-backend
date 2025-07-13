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
        await UserGroup.destroy({
            where: {
                userid: 'mock-user-id',
                groupid: 1,
            },
        });

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
            .send({ groupId: '1', invite: '1234567890' });

        expect(response.statusCode).toBe(200);
        expect(UserGroup.create).toHaveBeenCalledWith({
            userid: "mock-user-id",
            groupid: "1",
        });
    });

    it('should get a group by userid', async () => {
        // we mocked checkJwt so itll return a mock user id which should be seeded in db
        const response = await request(app)
            .get('/api/groups/get')
            .send();

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "groups": [{
                "id": 1,
                "inviteNumber": "1234567890",
                "name": "Test Group 1",
                "owner": "user123",
            }],
            success: true,
        });
    });

    it('should leave a group by userid and groupId', async () => {
        const mockDestroy = jest.spyOn(UserGroup, 'destroy').mockResolvedValue(1); 

        const response = await request(app)
            .post('/api/groups/leave')
            .send({ groupId: '1'});

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toEqual(true);
        expect(mockDestroy).toHaveBeenCalledWith({
            where: {
                userid: expect.any(String),
                groupid: '1',
            },
        });
    });
    
    it('should delete a group by userid and groupId', async () => {
        const mockDestroy = jest.spyOn(Groups, 'destroy').mockResolvedValue(1); 
        const mockDestroyUg = jest.spyOn(UserGroup, 'destroy').mockResolvedValue(1); 
        const gid = '2';
        const response = await request(app)
            .post('/api/groups/delete')
            .send({ groupId: gid });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toEqual(true);
        expect(mockDestroy).toHaveBeenCalledWith({
            where: {
                owner: expect.any(String),
                id: gid,
            },
        });
        expect(mockDestroyUg).toHaveBeenCalledWith({
            where: {
                groupid: gid,
            },
        });
    });

    it('should update a group name by userid, groupId and ', async () => {
        const mockUpdate = jest.spyOn(Groups, 'update').mockResolvedValue(1); 
        const name = 'test';
        const response = await request(app)
            .post('/api/groups/name')
            .send({ groupId: '2', name: 'test'});

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toEqual(true);
        expect(mockUpdate).toHaveBeenCalledWith(
            { name },
            { where: { id: '2' } }
        );
    });
});