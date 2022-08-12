import express from 'express';
import morgan from 'morgan';
import './DB/database.js';
import articulosRouter from './routes/articulos.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import orderRoutes from './routes/ordenes.routes.js';
import usersRoutes from './routes/user.routes.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logoutRoutes from './routes/logout.routes.js';
import loginRoutes from './routes/login.routes.js'

//**---- INICIO SERVIDOR */
const app = express();
const PORT = process.env.PORT || 8081;
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
});


//**----SETEO  */
app.set('views', './src/views');
app.set('view engine', 'ejs');

//**----MIDDLEWARES */
app.use(morgan('dev'));
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
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    // el usuario esta desconectado? entonces se procede a eliminar los datos de cookies
    next();
});

//**----ROUTES */

const sessionOn = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('');
    } else {
        next();
    }
};
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/api/articulos', articulosRouter);
app.use('/register', sessionOn, authRoutes, (req, res) => {
    res.render('register');
});
app.use('/user', sessionOn, usersRoutes);
app.use('/login',loginRoutes)
app.use('/api/carts', cartsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/logout', logoutRoutes);

//**MANEJO DE ERRORES */
app.use(function (req, res, net) {
    res.status(404).send('Todo esta realmente mal, revisa el error');
});
