import { Router } from 'express';
import authorization from '../middlewares/authorization';
import {
    authController
} from '../controllers';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/logout', authController.logout);
router.put('/updateUser/:userId', authController.updateUser);
router.get('/checkToken', authorization(["Admin", "HR", "User"]), authController.checkToken);

export default router;