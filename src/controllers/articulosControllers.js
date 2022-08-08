import logger from '../logs/loggers.js';
import Articulos from '../models/ArticulosModels.js';
//**---- montrar todo */
export const mostrarTodos = async (req, res) => {
    try {
        const articulos = await Articulos.find();
        logger.silly('mostrando articulos');
        res.json(articulos);
    } catch (error) {
        res.status(500).json({
            message:
                error.message || 'Algo ocurrio al momento de mostrar elementos',
        });
    }
};
//**---- crear uno nuevo */
export const crearArt = async (req, res) => {
    if (!req.body.title) {
        return res
            .status(400)
            .send({ message: 'Es requerido el titulo para crear' });
    }
    try {
        const nuevoArticulo = new Articulos({
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
        });
        const guardadoArticulo = await nuevoArticulo.save();
        logger.info('Articulo guardado con exito');
        res.json(guardadoArticulo);
    } catch (error) {
        logger.error('Error al crear articulo');
        res.status(500).json({
            message:
                error.message ||
                'Algo a ocurrido al momento de crear un nuevo elemento',
        });
    }
};
//**---- buscar uno por id */
export const buscar = async (req, res) => {
    const { id } = req.params;
    try {
        const buscaId = await Articulos.findById(id);
        if (!buscaId) {
            logger.info('elemento no encontrado');
            return res.status(404).json({
                message: `EL elementos que buscas ${id} no se encuentra`,
            });
        }
        res.json(buscaId);
    } catch (error) {
        logger.error('Error al mostrar aticulo solicitado con ID');
        res.status(500).json({
            message: error.message || `Error en id ${id}`,
        });
    }
};
//**---- eliminar uno mediante id */
export const eliminarUno = async (req, res) => {
    const { id } = req.params;
    try {
        await Articulos.findByIdAndDelete(id);
        logger.warn('Articulo eliminado correctamente');
        res.json({ mensaje: 'Articulo eliminado correctamente' });
    } catch (error) {
        logger.error(`No se encuentra ${id} no se puede eliminar`);
        res.status(500).json({
            message: error.message || `Error en id ${id} no se puede eliminar`,
        });
    }
};
//**---- monstrar solo los que tengan cierta condicion */
export const mostrarAlgunos = async (req, res) => {
    try {
        const muestraUnica = await Articulos.find({}, { stock: 1 });
        logger.info(`muestra unica de ${muestraUnica}`);
        res.json(muestraUnica);
    } catch (error) {
        logger.error('Error al buscar');
        res.status(404).json({
            message: `Error al buscar productos`,
        });
    }
};

//**---- actualizar algunos */

export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;
    if (!id || !body) {
        res.status(400).send('Es necesario indicar el ID para actualizar');
    }
    try {
        await Articulos.findOneAndUpdate(id, body);
        logger.info(`Articulo ${id} actualizado con exito`);
        res.json({ mensaje: ' actualizado con exito' });
    } catch (error) {
        logger.error(`Articulo ${id} no se puede actualizar`);
        res.status(500).json({
            message: `Error en id ${id} no se puede actualizar`,
        });
    }
};
