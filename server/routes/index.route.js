import express from 'express';

import authRouter from './auth.route';
import userRouter from './user.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
