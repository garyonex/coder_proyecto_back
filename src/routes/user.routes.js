import { Router } from 'express';
import CryptoJS from 'crypto-js';
import * as verifyCtrl from '../controllers/verifyControllers.js';
import User from '../models/UserModels.js';
const usersRoutes = Router();

//**---- ACTUALIZAR MEDIANTE ID  */
usersRoutes.put(
    '/:id',
    verifyCtrl.verifyTokenAuthorization,
    // mediante el verifyTokenAuthrization le pasamos los datosnecesatios para que pueda continuar este  codigo
    // si esta todo ok, pues continua, lee y modifica.
    async (req, res) => {
        const passwordHash = req.body.password;

        if (passwordHash) {
            passwordHash = CryptoJS.AES.encrypt(
                req.body.passwordHash,
                process.env.JWT_SEC
            ).toString();
        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
);
//**----ELIMINAR MEDIANTE ID USUARIO */
usersRoutes.delete(
    '/:id',
    verifyCtrl.verifyTokenAuthorization,
    async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Usuario fue eliminado ...');
        } catch (error) {
            res.status(500).json(error);
        }
    }
);

//**---- MOSTRAR UN USUARIOS MEDIANTE ID */
usersRoutes.get(
    '/buscar/:id',
    verifyCtrl.verifyTokenAndAdmin,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    }
);

//**---- MOSTRAR LISTA DE USUARIOS */
usersRoutes.get('/buscar', verifyCtrl.verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});
export default usersRoutes;
