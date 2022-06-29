import { Router } from 'express';
import { cartUserId, cartUsers, eliminar, modify, newCart } from '../controllers/cartControllers';
import {
    verifyToken,
    verifyTokenAuthorization,
} from '../controllers/verifyControllers';

const cartsRoutes = Router();

//**----CREAR */
cartsRoutes.post('/', verifyToken,newCart );

//**----MODIFICAR */
cartsRoutes.put('/id:', verifyTokenAuthorization, modify);

//**----ELIMINAR */
cartsRoutes.delete('/id',verifyTokenAuthorization, eliminar);

//**----MOSTRAR CARRITO USUARIOS*/
cartsRoutes.get('/mostrar/:userId',verifyTokenAuthorization,cartUserId )
//**----MOSTRAR CARRITOS */
cartsRoutes.get('/',verifyTokenAuthorization,cartUsers)
export default cartsRoutes;
