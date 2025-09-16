import express, { Router } from 'express';
import { getUser, setUser } from '../controllers/userController.js';
import validateUser from '../middlewares/validateUser.js';

const router: Router = express.Router();

router.get('/:userId', getUser);
router.post('/:userId', validateUser, setUser);

export default router;
