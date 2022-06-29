import { Router } from 'express';
import {
    orderUserId,
    createOrder,
    eliminarOrder,
    modifyOrder,
    orderTotal,
} from '../controllers/ordersCrontrollers';
import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAuthorization,
} from '../controllers/verifyControllers';
import Order from '../models/OrdenesModels.js';

const orderRoutes = Router();

//**---- CREAR */
orderRoutes.post('/', verifyToken, createOrder);

//**----MODIFICAR */
orderRoutes.put('/id:', verifyTokenAndAdmin, modifyOrder);

//**----ELIMINAR */
orderRoutes.delete('/id', verifyTokenAndAdmin, eliminarOrder);

//**----MOSTRAR ORDEN USUARIOS*/
orderRoutes.get('/buscar/:userId', verifyTokenAuthorization, orderUserId);

//**----MOSTRAR ORDENES */
orderRoutes.get('/', verifyTokenAuthorization, orderTotal);
export default orderRoutes;
