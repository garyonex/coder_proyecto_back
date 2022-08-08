import User from '../models/UserModels.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import logger from '../logs/loggers.js';

//**---- REGISTRO */

export const register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        passwordHash: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        // console.log(savedUser);
        logger.info(`Usuario guardado ${savedUser}`);
        res.status(201).redirect('/register/login');
    } catch (error) {
        logger.error(`Error al tratar de registrar usuario`);
        res.status(500).json(error);
    }
};

//**----LOGIN */

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        logger.error(`Error en username ${user}`);
        !user && res.status(401).json('Error en username');
        const decodePassword = CryptoJS.AES.decrypt(
            user.passwordHash,
            process.env.PASS_SEC
        );
        const originalPassword = decodePassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            logger.error(`Error en password`);
        res.status(401).json('Error en password');
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' }
        );
        const { password, ...others } = user._doc;
        //res.status(200).json({ ...others, accessToken });
        logger.info(`User login ${user.name}`);
        res.status(200).render('logeado', {
            user: user.username,
            email: user.email,
        });
    } catch (error) {
        logger.warn(`Ocurrio un error ${error}`);
        res.status(500).json(error);
    }
};
