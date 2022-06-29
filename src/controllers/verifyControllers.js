import jwt from 'jsonwebtoken';

// verifica token
export const verifyToken = async (req, res, next) => {
    const authHeader = req.get('authorization');

    let token = '';
    if (authHeader && authHeader.toLowerCase().startsWith('bearer')) {
        token = authHeader.substring(7);

        try {
            let decodeToken = {};
            decodeToken = jwt.verify(
                token,
                process.env.JWT_SEC,
                (err, user) => {
                    if (err) res.status(403).json('token invalido');
                    req.user = user;
                    next();
                }
            );
        } catch (e) {
            console.log(e);
        }
    } else {
        return res.status(401).json('No esta autenticado');
    }
};
//---- si la verificacion esta ok, continnua y me da el id del usuario que estoy buscando
export const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Algo esta muy mal');
        }
    });
};

export const authorization = async (req, res) => {
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
        res.status(500).json('Error al autorizar');
    }
};
export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Algo esta muy mal');
        }
    });
};
