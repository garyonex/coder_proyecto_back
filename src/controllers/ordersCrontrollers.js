//**----Crear */
export const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear carrito' });
    }
};
//**----Modificar */
export const modifyOrder = async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
    }
};

//**----eliminar */
export const eliminarOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id);
        res.status(200).json('Orden eliminada');
    } catch (error) {
        res.status(500).json(error);
    }
};

//**---Order por id usuario */
export const orderUserId = async (req, res) => {
    try {
        const orderUser = await Order.find({ userId: req.params.userId });
        res.status(200).json(orderUser);
    } catch (error) {
        res.status(500).json({
            error: 'Error al mostrar ORDEN de usuario',
        });
    }
};

//**---- Mostrar todas las ordenes */
export const orderTotal = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
};
