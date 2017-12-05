import express from 'express';

import AuthController from '../controllers/auth';

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.get('/confirmation/:token', AuthController.confirmEmail);

export default router;
