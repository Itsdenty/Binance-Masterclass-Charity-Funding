import express from 'express';
import multer from 'multer';
import controller from '../../../controllers/user';
import validator from '../../../middlewares/validators/user';
import auth from '../../../middlewares/auth/jwt-verify';


const router = express.Router();
router.post('/signup', validator.create, controller.createUser);
router.post('/login', validator.login, controller.userLogin);
router.post('/funding',  validator.funding, multer().single('proof'), controller.createFundingAccount);
router.get('/funding/:address', controller.getFundingAccount);
router.get('/vote/:address:amount',  auth.verifyToken, controller.voteAccount );
router.get('/balance', auth.verifyToken, controller.getUserBalance);
router.get('/vote', auth.verifyToken, controller.getVoteProfile);
router.post('/swap', auth.verifyToken, validator.swap, controller.swapToken);
export default router;
