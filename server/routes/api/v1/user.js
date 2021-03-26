import express from 'express';
import controller from '../../../controllers/user';
import validator from '../../../middlewares/validators/user';


const router = express.Router();
router.post('/signup', validator.create, controller.createUser);
router.post('/login', validator.login, controller.userLogin);
router.get('/roles', controller.getRoles);

export default router;
