import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './DB/database.js';
import './passport/passportFB.js';
import articulosRouter from './routes/articulos.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import orderRoutes from './routes/ordenes.routes.js';
import usersRoutes from './routes/user.routes.js';
import logoutRoutes from './routes/logout.routes.js';
import loginRoutes from './routes/login.routes.js';
import fbRoutes from './routes/fbAuth.routes.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import logger from './logs/loggers.js';
import middlewareMorgan from './logs/morganLogs.js';
import cluster from 'cluster'
import os from 'os'

//**---- VARIABLE DE ENTORNOS  *
const variable = yargs(hideBin(process.argv));
const arg = variable.alias({ p: 'puerto' }).default({ p: 3001 }).argv;

//**---- INICIO SERVIDOR */
const app = express();
const PORT = arg.p || 3001;
app.listen(PORT, () => {
    logger.info(`Servidor conectado en ${PORT}`);
});
//TODO---- MODO CLUSTER
const MODO_CLUSTER = process.argv[3] ==='CLUSTER' 
if(MODO_CLUSTER && cluster.isMaster){
    const countCpus= os.cpus().length
    console.log('Master')
    logger.info('Master')
    for (let i = 0; i < countCpus; i++) {
        cluster.fork();
    }
}
//**----SETEO  */
app.set('views', './src/views');
app.set('view engine', 'ejs');

//**----MIDDLEWARES */
//app.use(morgan('combined',{'stream':logger.stream})); //TODO otra forma de llevar el registro
app.use(middlewareMorgan);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        key: 'user_sid',
        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 },
    })
);
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: 'secreto_dos',
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
);
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    // el usuario esta desconectado? entonces se procede a eliminar los datos de cookies
    next();
});

//**----ROUTES */
//? Para verificar usuarios
const sessionOn = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('');
    } else {
        next();
    }
};
// function sessionOn (req, res, next){
//     if(req.isAuthenticated()){
//         next()
//     }else{
//         res.render('login')
//     }
// }
app.get('/', (req, res) => {
    logger.info('Index');
    res.render('index');
});
app.use('/api/articulos', articulosRouter, (req, res) => {
    logger.info('api/articulos');
});
app.use('/auth', fbRoutes);
app.use('/dato', (req, res) => {
    logger.info('Usuario registrado - logeado ');
    res.render('logeado');
});
app.use('/register', sessionOn, authRoutes, (req, res) => {
    logger.info('Usuario registrado');
    res.render('register');
});
app.use('/user', sessionOn, usersRoutes);
app.use('/login', loginRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/logout', logoutRoutes);

//**MANEJO DE ERRORES */
app.use(function (req, res, net) {
    logger.warn(`Direccion equivocada`);
    res.status(404).send('Todo esta realmente mal, revisa el error');
});
