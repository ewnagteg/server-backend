import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import { checkApiKey } from '../../middleware/apiKey.js';
import * as miscController from '../../controllers/miscController.js';

const router = express.Router();

router.get('/news', checkJwt, miscController.getNews);

router.post('/news', checkApiKey, miscController.addNews);

router.get('/preds', checkJwt, miscController.getChart);

router.get('/profile', checkJwt, miscController.getProfile);

router.post('/profile', checkJwt, miscController.updateProfile);

router.get('/probs', checkJwt, miscController.getProbs);

router.post('/log-match', checkApiKey, miscController.logMatch);

router.post('/add-match', checkApiKey, miscController.addMatch);

export default router;