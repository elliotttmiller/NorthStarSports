import express, { Request, Response, Router } from 'express';
import { getUser, setUser } from '../controllers/userController';
import validateUser from '../middlewares/validateUser';

const router: Router = express.Router();

router.get('/:userId', getUser);
router.post('/:userId', validateUser, setUser);

export default router;
