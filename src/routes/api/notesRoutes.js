import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import * as notesController from '../../controllers/notesController.js';

const router = express.Router();

router.get('/notes', checkJwt, notesController.getNotes);

router.post('/notes', checkJwt, notesController.addNotes);

export default router;