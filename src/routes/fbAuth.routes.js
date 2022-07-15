import { Router } from 'express';
import passport from 'passport';

const fbRoutes = Router();
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('login');
    }
}
fbRoutes.get('/', passport.authenticate('facebook'));
fbRoutes.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
        failureRedirect: 'errorRegister',
        successRedirect: '/dato',
    })
);



export default fbRoutes;
