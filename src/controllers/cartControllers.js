import Cart from '../models/CartModels.js';
//**---- Crear */
export const newCart = async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear carrito' });
    }
};

//**---- modificar */
export const modify = async (req, res) => {
    try {
        const newCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(newCart);
    } catch (error) {
        res.status(500).json(error);
    }
};
//**---eliminar */
export const eliminar = async (req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.id);
        res.status(200).json('Carrito eliminado');
    } catch (error) {
        res.status(500).json(error);
    }
};
//**---- mostrar mediante id user */
export const cartUserId = async (req, res) => {
    try {
        const cartUser = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cartUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al mostrar carrito usuario' });
    }
};
//**---- monstrar todos */
export const cartUsers = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
};
