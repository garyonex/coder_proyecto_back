import express from 'express';
import morgan from 'morgan';
import './DB/database.js';
import articulosRouter from './routes/articulos.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import orderRoutes from './routes/ordenes.routes.js';
import usersRoutes from './routes/user.routes.js';

//**---- INICIO SERVIDOR */
const app = express();
const PORT = 3001;
app.listen(PORT);
console.log(`Server listen port ${PORT}`);

//**----MIDDLEWARES */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//**----ROUTES */
app.get('/', (req, res) => {
    res.json({ Mensaje: 'Bienvenidos' });
});
app.use('/api/articulos', articulosRouter);
app.use('/register',authRoutes)
app.use('/user',usersRoutes)
app.use('/api/carts',cartsRoutes)
app.use('/api/orders',orderRoutes)