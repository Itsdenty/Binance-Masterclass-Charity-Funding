import express from 'express';
import api from './api';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('You\'ve reached index routes');
});

router.use('/api', api);

// app.listen(process.env.HTTP_PORT || 3000);
// 404 route
router.all('*', (req, res) => {
  const errorMessage = {
    message: 'You are hitting a wrong route',
    success: false,
  };
  res.status(404).json(errorMessage);
});
export default router;
