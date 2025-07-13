import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import * as groupsController from '../../controllers/groupsController.js';

const router = express.Router();

router.post('/groups/create', checkJwt, groupsController.createGroup);

router.post('/groups/join', checkJwt, groupsController.joinGroup);

router.get('/groups/get', checkJwt, groupsController.getUserGroup);

router.post('/groups/leave', checkJwt, groupsController.leaveGroup);

router.post('/groups/name', checkJwt, groupsController.setGroupName);

router.post('/groups/delete', checkJwt, groupsController.deleteGroup);

export default router;