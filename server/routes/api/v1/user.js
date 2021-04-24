import express from 'express';
import multer from 'multer';
import formidable from 'express-formidable';
import controller from '../../../controllers/user';
import validator from '../../../middlewares/validators/user';
import auth from '../../../middlewares/auth/jwt-verify';
import fix from '../../../middlewares/fix-body';
// var upload = multer({ dest: './server/public/uploads/' })

const router = express.Router();
router.post('/signup', validator.create, controller.createUser);
router.post('/login', validator.login, controller.userLogin);
// router.post('/funding', formidable(), fix.upload, auth.verifyToken, validator.funding, controller.createFundingAccount);
router.post('/funding', multer().single('proof'), auth.verifyToken, validator.funding, controller.createFundingAccount);
router.get('/funding', controller.getFundingAccounts);
router.get('/funding/:id', controller.getFundingAccount);
router.get('/vote/:address/:amount',  auth.verifyToken, controller.voteAccount );
router.get('/balance', auth.verifyToken, controller.getUserBalance);
router.get('/vote', auth.verifyToken, controller.getVoteProfile);
router.get('/votes/:id', controller.getVotes);
router.get('/votes/', auth.verifyToken, controller.getUserVotes)
router.post('/swap', auth.verifyToken, validator.swap, controller.swapToken);
router.post('/withdraw', auth.verifyToken, validator.withdrawal, controller.withdrawBnb);
router.post('/fund-account', auth.verifyToken, validator.fundAccount, controller.fundAccount);

export default router;
