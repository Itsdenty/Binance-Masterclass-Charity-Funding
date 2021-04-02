import express from 'express';
import v1 from './v1';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('You\'ve reached api routes');
});

router.use('/v1', v1);

export default router;
