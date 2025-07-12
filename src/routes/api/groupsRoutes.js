import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import * as groupsController from '../../controllers/groupsController.js';

const router = express.Router();

router.post('/groups/create', checkJwt, groupsController.createGroup);

router.post('/groups/join', checkJwt, groupsController.joinGroup);

router.get('/groups/get', checkJwt, groupsController.getUserGroup);

export default router;