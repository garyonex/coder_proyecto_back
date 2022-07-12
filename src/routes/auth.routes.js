import { Router } from 'express';
import * as authCtrl from '../controllers/authControllers.js';
const authRoutes = Router();
authRoutes.post('/', authCtrl.register,(req,res)=>{
    res.render('register')
});
// authRoutes.post('/login', authCtrl.login,(req,res)=>{
//     res.render('login.ejs')
// });
export default authRoutes;
