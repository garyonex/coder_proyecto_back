import User from '../models/UserModels.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

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
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

//**----LOGIN */

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json('Error en username');
        const decodePassword = CryptoJS.AES.decrypt(
            user.passwordHash,
            process.env.PASS_SEC
        );
        const originalPassword = decodePassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
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
        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        res.status(500).json(error)
    }
};
