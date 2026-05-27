import express from 'express';
import { getWorkspace } from '../controllers/workspace.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import allowRoles from '../middlewares/roles.middleware.js';

const router = express.Router();

router.get('/workspace', authMiddleware, allowRoles('owner'), getWorkspace);

export default router;
