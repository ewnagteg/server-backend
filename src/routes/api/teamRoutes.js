import express from 'express';
import { checkApiKey } from '../../middleware/apiKey.js';
import { checkJwt } from '../../middleware/auth.js';
import * as teamController from '../../controllers/teamController.js';
const router = express.Router();

router.post('/team/add', checkJwt, teamController.addPlayer);

router.post('/team/delete', checkJwt, teamController.deletePlayer);

router.get('/get-teams', checkApiKey, teamController.getTeams);

router.get('/team', checkJwt, teamController.getTeam);

router.get('/stats', checkJwt, teamController.getStats);

router.get('/team-stats', checkJwt, teamController.getTeamStats);

export default router;