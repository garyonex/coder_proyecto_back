import { Router } from 'express';
import * as authCtrl from '../controllers/authControllers.js';
const authRoutes = Router();
authRoutes.post('/', authCtrl.register);
authRoutes.post('/login', authCtrl.login);
export default authRoutes;
