import { Router } from 'express';
import * as authCtrl from '../controllers/authControllers';

const loginRoutes = Router();
loginRoutes.get('/',(req,res)=>{
    res.status(200).render('login')
})
loginRoutes.post('/', authCtrl.login, (req, res) => {
    res.status(200).render('logeado');
});
export default loginRoutes;
 